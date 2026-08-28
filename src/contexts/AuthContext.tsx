import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { UserProfile, UserRole } from '@/types';
import { userService } from '@/services/dataService';
import { toast } from 'sonner';

export const ADMIN_EMAIL = 'aldihidayatulloh45@gmail.com';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  role: UserRole | null;
  loading: boolean;
  isAdmin: boolean;
  isUser: boolean;
  isAuthModalOpen: boolean;
  authModalReason: string;
  openAuthModal: (reason?: string) => void;
  closeAuthModal: () => void;
  requireAuth: (callback?: () => void, reason?: string) => boolean;
  loginWithGoogle: (targetRole?: UserRole) => Promise<void>;
  loginAsUser: (name?: string, email?: string, phone?: string) => Promise<void>;
  loginAsAdmin: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalReason, setAuthModalReason] = useState('Silakan masuk atau daftar terlebih dahulu untuk menggunakan fitur ini.');
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(null);

  const openAuthModal = (reason?: string) => {
    if (reason) setAuthModalReason(reason);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setPendingCallback(null);
  };

  const requireAuth = (callback?: () => void, reason?: string): boolean => {
    if (user) {
      if (callback) callback();
      return true;
    }
    const defaultReason = reason || 'Silakan masuk atau daftar akun terlebih dahulu untuk melanjutkan pesanan.';
    setAuthModalReason(defaultReason);
    toast.info(defaultReason);
    if (callback) setPendingCallback(() => callback);
    setIsAuthModalOpen(true);
    return false;
  };

  // Load custom demo session if stored locally
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const isAdminUser = firebaseUser.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
        
        // Fetch or create profile in Firestore
        let profile = await userService.getProfile(firebaseUser.uid);
        if (!profile) {
          profile = {
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName || (isAdminUser ? 'Aldi Hidayatulloh' : 'Pelanggan'),
            email: firebaseUser.email || '',
            role: isAdminUser ? 'admin' : 'user',
            memberSince: new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
          };
          await userService.saveProfile(firebaseUser.uid, profile).catch(() => null);
        }
        setUserProfile(profile);
      } else {
        // Check local demo user session
        const storedDemo = localStorage.getItem('akj_demo_session');
        if (storedDemo) {
          try {
            const parsed = JSON.parse(storedDemo) as UserProfile;
            setUserProfile(parsed);
            // Mock minimal user interface for compatibility
            setUser({
              uid: parsed.uid,
              displayName: parsed.displayName,
              email: parsed.email,
              emailVerified: true,
              isAnonymous: false,
              metadata: {},
              providerData: [],
              refreshToken: '',
              tenantId: null,
              delete: async () => {},
              getIdToken: async () => '',
              getIdTokenResult: async () => ({} as any),
              reload: async () => {},
              toJSON: () => ({}),
              phoneNumber: parsed.phone || null,
              photoURL: null,
              providerId: 'custom'
            } as unknown as User);
          } catch (e) {
            localStorage.removeItem('akj_demo_session');
            setUser(null);
            setUserProfile(null);
          }
        } else {
          setUser(null);
          setUserProfile(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async (targetRole: UserRole = 'user') => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const fbUser = result.user;
      
      const isAdminUser = fbUser.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() || targetRole === 'admin';
      
      const newProfile: UserProfile = {
        uid: fbUser.uid,
        displayName: fbUser.displayName || (isAdminUser ? 'Admin Pengelola' : 'Pelanggan'),
        email: fbUser.email || '',
        role: isAdminUser ? 'admin' : 'user',
        memberSince: new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
      };
      
      await userService.saveProfile(fbUser.uid, newProfile).catch(() => null);
      setUserProfile(newProfile);
      localStorage.removeItem('akj_demo_session');
      setIsAuthModalOpen(false);
      if (pendingCallback) {
        pendingCallback();
        setPendingCallback(null);
      }
      toast.success(`Berhasil masuk sebagai ${isAdminUser ? 'Admin Pengelola' : 'Pelanggan / Member'}!`);
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        toast.info('Jendela login ditutup.');
      } else {
        console.error("Login Google Error:", error);
        toast.error('Gagal login dengan Google. Anda juga dapat menggunakan tombol Masuk Cepat.');
      }
    }
  };

  const loginAsUser = async (name = 'Budi Santoso', email = 'pelanggan@ayamkremes.id', phone = '081298765432') => {
    const demoId = 'user_demo_' + Math.random().toString(36).substring(2, 8);
    const demoProfile: UserProfile = {
      uid: demoId,
      displayName: name,
      email: email,
      role: 'user',
      phone: phone,
      address: 'Jl. Fatmawati Raya No. 45, Jakarta Selatan',
      memberSince: 'Agustus 2026'
    };

    localStorage.setItem('akj_demo_session', JSON.stringify(demoProfile));
    setUserProfile(demoProfile);
    setUser({
      uid: demoProfile.uid,
      displayName: demoProfile.displayName,
      email: demoProfile.email,
      emailVerified: true,
      isAnonymous: false,
      metadata: {},
      providerData: [],
      refreshToken: '',
      tenantId: null,
      delete: async () => {},
      getIdToken: async () => '',
      getIdTokenResult: async () => ({} as any),
      reload: async () => {},
      toJSON: () => ({}),
      phoneNumber: demoProfile.phone || null,
      photoURL: null,
      providerId: 'demo'
    } as unknown as User);

    // Save profile to database as well
    await userService.saveProfile(demoId, demoProfile).catch(() => null);
    setIsAuthModalOpen(false);
    if (pendingCallback) {
      pendingCallback();
      setPendingCallback(null);
    }
    toast.success(`Selamat datang, ${demoProfile.displayName}! Masuk sebagai Member.`);
  };

  const loginAsAdmin = async () => {
    const adminId = 'admin_aldi_master';
    const adminProfile: UserProfile = {
      uid: adminId,
      displayName: 'Aldi Hidayatulloh (Owner & Admin)',
      email: ADMIN_EMAIL,
      role: 'admin',
      phone: '081299887766',
      memberSince: 'Januari 2018'
    };

    localStorage.setItem('akj_demo_session', JSON.stringify(adminProfile));
    setUserProfile(adminProfile);
    setUser({
      uid: adminProfile.uid,
      displayName: adminProfile.displayName,
      email: adminProfile.email,
      emailVerified: true,
      isAnonymous: false,
      metadata: {},
      providerData: [],
      refreshToken: '',
      tenantId: null,
      delete: async () => {},
      getIdToken: async () => '',
      getIdTokenResult: async () => ({} as any),
      reload: async () => {},
      toJSON: () => ({}),
      phoneNumber: adminProfile.phone || null,
      photoURL: null,
      providerId: 'demo'
    } as unknown as User);

    await userService.saveProfile(adminId, adminProfile).catch(() => null);
    setIsAuthModalOpen(false);
    if (pendingCallback) {
      pendingCallback();
      setPendingCallback(null);
    }
    toast.success('Berhasil masuk sebagai Administrator Pengelola!');
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!userProfile) return;
    const updated: UserProfile = { ...userProfile, ...data };
    setUserProfile(updated);
    if (localStorage.getItem('akj_demo_session')) {
      localStorage.setItem('akj_demo_session', JSON.stringify(updated));
    }
    await userService.saveProfile(updated.uid, updated).catch(() => null);
    toast.success('Profil berhasil diperbarui!');
  };

  const logout = async () => {
    try {
      localStorage.removeItem('akj_demo_session');
      await signOut(auth).catch(() => null);
      setUser(null);
      setUserProfile(null);
      toast.info('Anda telah keluar akun.');
    } catch (e) {
      console.error(e);
    }
  };

  const role = userProfile?.role || (user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? 'admin' : (user ? 'user' : null));
  const isAdmin = role === 'admin';
  const isUser = role === 'user';

  return (
    <AuthContext.Provider value={{
      user,
      userProfile,
      role,
      loading,
      isAdmin,
      isUser,
      isAuthModalOpen,
      authModalReason,
      openAuthModal,
      closeAuthModal,
      requireAuth,
      loginWithGoogle,
      loginAsUser,
      loginAsAdmin,
      updateUserProfile,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

