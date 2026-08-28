import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, ADMIN_EMAIL } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck, Lock, ArrowLeft, Utensils, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLogin() {
  const { loginWithGoogle, loginAsAdmin, user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // If already admin, redirect to dashboard
  React.useEffect(() => {
    if (isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  const handleGoogleAdminLogin = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      await loginWithGoogle('admin');
      navigate('/admin');
    } catch (e: any) {
      console.error(e);
      setErrorMsg('Gagal memverifikasi akun Google Admin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    // Support owner master PIN (e.g. 2018 or 123456 or admin)
    if (pin.trim() === '2018' || pin.trim() === '4545' || pin.trim() === 'admin123') {
      setIsLoading(true);
      try {
        await loginAsAdmin();
        toast.success('Verifikasi Admin Berhasil!');
        navigate('/admin');
      } catch (err) {
        setErrorMsg('Terjadi kesalahan saat masuk.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrorMsg('PIN Akses Pengelola tidak valid.');
      toast.error('PIN Akses Pengelola tidak valid.');
    }
  };

  return (
    <div className="min-h-screen bg-[#1C1819] text-white flex flex-col items-center justify-center p-4 relative font-sans">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF5E14]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#231F20] border-2 border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-[#FF5E14] text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="font-display font-black text-2xl uppercase tracking-tight text-white">
            PORTAL PENGELOLA
          </h1>
          <p className="text-xs text-stone-400">
            Akses khusus administrator & pemilik Ayam Kremes Jakarta
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-3 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Option 1: Google Login for authorized email */}
        <div className="space-y-3">
          <Button
            type="button"
            onClick={handleGoogleAdminLogin}
            disabled={isLoading}
            className="w-full h-12 bg-white hover:bg-stone-100 text-[#231F20] rounded-full font-display font-black text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-3"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            Masuk dengan Akun Google Admin
          </Button>
          <p className="text-[10px] text-center text-stone-500 font-mono">
            Otorisasi: {ADMIN_EMAIL}
          </p>
        </div>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink mx-3 text-[10px] uppercase font-bold text-stone-500">Atau Gunakan PIN Master</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        {/* Option 2: Master Access PIN */}
        <form onSubmit={handlePinSubmit} className="space-y-4">
          <div>
            <Label className="text-xs font-bold text-stone-300">PIN Keamanan Pengelola</Label>
            <div className="relative mt-1">
              <Lock className="w-4 h-4 absolute left-3.5 top-3 text-stone-500" />
              <Input
                type="password"
                placeholder="Masukkan PIN (Default: 2018)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="pl-10 h-10 rounded-xl bg-stone-900/80 border-white/15 text-white text-xs"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !pin.trim()}
            className="w-full h-11 bg-[#FEBD11] hover:bg-[#E5AA0F] text-[#231F20] rounded-full font-display font-black text-xs uppercase tracking-wider shadow-sm"
          >
            Buka Panel Pengelola
          </Button>
        </form>

        {/* Back to Home */}
        <div className="text-center pt-2">
          <Link 
            to="/" 
            className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali ke Beranda Pelanggan
          </Link>
        </div>

      </div>

    </div>
  );
}
