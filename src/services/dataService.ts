import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { MenuItem, Promo, ChatMessage, ChatRoom } from '@/types';

export const menuService = {
  async getAll() {
    const q = query(collection(db, 'menus'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem));
  },

  async getMainMenus() {
    const q = query(collection(db, 'menus'), where('isMain', '==', true));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem));
  },

  async add(menu: Omit<MenuItem, 'id' | 'createdAt'>) {
    return await addDoc(collection(db, 'menus'), {
      ...menu,
      createdAt: serverTimestamp(),
    });
  },

  async update(id: string, menu: Partial<MenuItem>) {
    const docRef = doc(db, 'menus', id);
    return await updateDoc(docRef, menu);
  },

  async delete(id: string) {
    const docRef = doc(db, 'menus', id);
    return await deleteDoc(docRef);
  }
};

export const promoService = {
  async getAll() {
    const q = query(collection(db, 'promos'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Promo));
  },

  async getActive() {
    const q = query(collection(db, 'promos'), where('active', '==', true));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Promo));
  },

  async add(promo: Omit<Promo, 'id' | 'createdAt'>) {
    return await addDoc(collection(db, 'promos'), {
      ...promo,
      createdAt: serverTimestamp(),
    });
  },

  async update(id: string, promo: Partial<Promo>) {
    const docRef = doc(db, 'promos', id);
    return await updateDoc(docRef, promo);
  },

  async delete(id: string) {
    const docRef = doc(db, 'promos', id);
    return await deleteDoc(docRef);
  }
};

export const orderService = {
  async getAll() {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
  },

  async add(order: Omit<any, 'id' | 'createdAt'>) {
    return await addDoc(collection(db, 'orders'), {
      ...order,
      createdAt: serverTimestamp(),
    });
  },

  async updateStatus(id: string, status: string) {
    const docRef = doc(db, 'orders', id);
    return await updateDoc(docRef, { status });
  }
};

export const chatService = {
  async getOrCreateRoom(userId: string, userName: string, userEmail: string) {
    const docRef = doc(db, 'chats', userId);
    // Use set with merge to ensure the room info is up to date
    await updateDoc(docRef, {
      userName,
      userEmail,
      lastUpdatedAt: serverTimestamp()
    }).catch(async () => {
      // If doc doesn't exist, create it
      const { setDoc } = await import('firebase/firestore');
      await setDoc(docRef, {
        userName,
        userEmail,
        lastUpdatedAt: serverTimestamp(),
        createdAt: serverTimestamp()
      });
    });
    return userId;
  },

  async sendMessage(roomId: string, senderId: string, senderName: string, text: string) {
    const messagesRef = collection(db, 'chats', roomId, 'messages');
    await addDoc(messagesRef, {
      senderId,
      senderName,
      text,
      timestamp: serverTimestamp()
    });
    
    // Update last message in room
    const roomRef = doc(db, 'chats', roomId);
    await updateDoc(roomRef, {
      lastMessage: text,
      lastUpdatedAt: serverTimestamp()
    });
  },

  listenRooms(callback: (rooms: ChatRoom[]) => void) {
    const q = query(collection(db, 'chats'), orderBy('lastUpdatedAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const rooms = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ChatRoom));
      callback(rooms);
    });
  },

  listenMessages(roomId: string, callback: (messages: ChatMessage[]) => void) {
    const q = query(collection(db, 'chats', roomId, 'messages'), orderBy('timestamp', 'asc'));
    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ChatMessage));
      callback(messages);
    });
  }
};
