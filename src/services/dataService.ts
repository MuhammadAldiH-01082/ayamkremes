import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  onSnapshot,
  writeBatch
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { MenuItem, Promo, ChatMessage, ChatRoom, Order, UserProfile, OrderStatus } from '@/types';
import { DEFAULT_MENUS, DEFAULT_PROMOS } from '@/data/defaultCatalogue';

export const userService = {
  async getProfile(uid: string): Promise<UserProfile | null> {
    try {
      const docRef = doc(db, 'users', uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        return snap.data() as UserProfile;
      }
      return null;
    } catch (e) {
      console.warn("Could not fetch user profile:", e);
      return null;
    }
  },

  async saveProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
    const docRef = doc(db, 'users', uid);
    await setDoc(docRef, {
      ...data,
      uid,
      updatedAt: serverTimestamp()
    }, { merge: true });
  }
};

export const menuService = {
  async getAll(): Promise<MenuItem[]> {
    try {
      const q = query(collection(db, 'menus'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      if (snapshot.empty) return [];
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem));
    } catch (error) {
      console.warn("Firestore menu query error, returning empty:", error);
      return [];
    }
  },

  async getMainMenus(): Promise<MenuItem[]> {
    try {
      const q = query(collection(db, 'menus'), where('isMain', '==', true));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem));
    } catch (e) {
      return [];
    }
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
  },

  async deleteAll() {
    const snap = await getDocs(collection(db, 'menus'));
    const batch = writeBatch(db);
    snap.docs.forEach(d => batch.delete(d.ref));
    await batch.commit();
  }
};

export const promoService = {
  async getAll(): Promise<Promo[]> {
    try {
      const q = query(collection(db, 'promos'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      if (snapshot.empty) return [];
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Promo));
    } catch (error) {
      console.warn("Firestore promo query error:", error);
      return [];
    }
  },

  async getActive(): Promise<Promo[]> {
    try {
      const q = query(collection(db, 'promos'), where('active', '==', true));
      const snapshot = await getDocs(q);
      if (snapshot.empty) return [];
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Promo));
    } catch (e) {
      return [];
    }
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
  },

  async deleteAll() {
    const snap = await getDocs(collection(db, 'promos'));
    const batch = writeBatch(db);
    snap.docs.forEach(d => batch.delete(d.ref));
    await batch.commit();
  }
};

export const orderService = {
  async getAll(): Promise<Order[]> {
    try {
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
    } catch (e) {
      console.warn("Could not fetch all orders:", e);
      return [];
    }
  },

  async getUserOrders(userId: string): Promise<Order[]> {
    try {
      const q = query(collection(db, 'orders'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
    } catch (e) {
      // Fallback in case index is not built
      try {
        const q2 = query(collection(db, 'orders'), where('userId', '==', userId));
        const snapshot2 = await getDocs(q2);
        return snapshot2.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
      } catch (err) {
        console.warn("Could not fetch user orders:", err);
        return [];
      }
    }
  },

  async add(order: Omit<Order, 'id' | 'createdAt'>) {
    return await addDoc(collection(db, 'orders'), {
      ...order,
      status: order.status || 'Pending',
      createdAt: serverTimestamp(),
    });
  },

  async updateStatus(id: string, status: OrderStatus) {
    const docRef = doc(db, 'orders', id);
    return await updateDoc(docRef, { status, updatedAt: serverTimestamp() });
  },

  async delete(id: string) {
    const docRef = doc(db, 'orders', id);
    return await deleteDoc(docRef);
  }
};

export const chatService = {
  async getOrCreateRoom(userId: string, userName?: string | null, userEmail?: string | null) {
    const docRef = doc(db, 'chats', userId);
    await setDoc(docRef, {
      userName: userName || 'Pelanggan',
      userEmail: userEmail || '',
      lastUpdatedAt: serverTimestamp()
    }, { merge: true });
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
    
    const roomRef = doc(db, 'chats', roomId);
    await setDoc(roomRef, {
      lastMessage: text,
      lastUpdatedAt: serverTimestamp()
    }, { merge: true });
  },

  listenRooms(callback: (rooms: ChatRoom[]) => void) {
    const q = query(collection(db, 'chats'), orderBy('lastUpdatedAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const rooms = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ChatRoom));
      callback(rooms);
    }, (err) => console.warn("Chat listen rooms err:", err));
  },

  listenMessages(roomId: string, callback: (messages: ChatMessage[]) => void) {
    const q = query(collection(db, 'chats', roomId, 'messages'), orderBy('timestamp', 'asc'));
    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ChatMessage));
      callback(messages);
    }, (err) => console.warn("Chat listen messages err:", err));
  }
};

export const databaseResetService = {
  /**
   * Reset the database: clears old menu items & promos, then seeds fresh default catalog.
   */
  async resetAndSeedDatabase(): Promise<{ success: boolean; menusCount: number; promosCount: number }> {
    try {
      // 1. Clear existing menus & promos
      await menuService.deleteAll().catch(() => null);
      await promoService.deleteAll().catch(() => null);

      // 2. Seed default menus
      const batch = writeBatch(db);
      for (const item of DEFAULT_MENUS) {
        const { id, ...data } = item;
        const newDocRef = doc(collection(db, 'menus'));
        batch.set(newDocRef, {
          ...data,
          createdAt: serverTimestamp()
        });
      }

      // 3. Seed default promos
      for (const promo of DEFAULT_PROMOS) {
        const { id, ...data } = promo;
        const newDocRef = doc(collection(db, 'promos'));
        batch.set(newDocRef, {
          ...data,
          createdAt: serverTimestamp()
        });
      }

      await batch.commit();

      return {
        success: true,
        menusCount: DEFAULT_MENUS.length,
        promosCount: DEFAULT_PROMOS.length
      };
    } catch (error) {
      console.error("Failed to reset and seed database:", error);
      throw error;
    }
  }
};

