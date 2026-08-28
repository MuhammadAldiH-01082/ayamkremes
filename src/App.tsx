import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminLogin from '@/pages/AdminLogin';
import { Toaster } from '@/components/ui/sonner';

function AdminRouteGuard() {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#231F20] text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#FF5E14] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-display uppercase tracking-widest text-stone-400">Memverifikasi Otorisasi...</p>
        </div>
      </div>
    );
  }

  // If verified admin, render dashboard, otherwise show discreet admin login
  if (!isAdmin) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-[#FAF4E8] flex flex-col font-sans">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin/*" element={<AdminRouteGuard />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
            <Toaster position="top-right" richColors />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
