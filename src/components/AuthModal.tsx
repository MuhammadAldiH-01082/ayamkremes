import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  Sparkles, 
  CheckCircle2, 
  Zap,
  Phone,
  Mail,
  UserCheck
} from 'lucide-react';
import { toast } from 'sonner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { loginWithGoogle, loginAsUser, authModalReason } = useAuth();
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [customPhone, setCustomPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickUserLogin = async () => {
    setIsLoading(true);
    try {
      await loginAsUser('Pelanggan Setia', 'pelanggan@ayamkremes.id', '081298765432');
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) {
      toast.error('Silakan isi Nama Lengkap Anda.');
      return;
    }
    const finalEmail = customEmail.trim() || `${customName.toLowerCase().replace(/\s+/g, '')}@gmail.com`;
    const finalPhone = customPhone.trim() || '081234567890';
    
    setIsLoading(true);
    try {
      await loginAsUser(customName.trim(), finalEmail, finalPhone);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-[#FAF4E8] rounded-3xl border-2 border-[#231F20]/20 shadow-2xl text-[#231F20]">
        
        {/* Header Visual */}
        <div className="bg-[#231F20] text-white p-6 sm:p-7 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5E14]/20 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5E14]/20 border border-[#FF5E14]/30 text-[#FEBD11] text-[11px] font-display font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Member & Pemesanan
            </div>
            <DialogTitle className="text-2xl font-display font-black text-white tracking-tight uppercase">
              MASUK / DAFTAR
            </DialogTitle>
            <DialogDescription className="text-white/80 text-xs mt-1 leading-relaxed">
              {authModalReason || 'Masuk untuk mengumpulkan menu ke keranjang dan melacak pesanan katering Anda.'}
            </DialogDescription>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          
          {/* Member Benefits */}
          <div className="bg-white rounded-2xl p-4 border border-[#231F20]/10 space-y-2 text-xs">
            <p className="font-display font-black text-[#231F20] uppercase flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#7BA03C]" />
              Keuntungan Member Ayam Kremes Jakarta:
            </p>
            <ul className="text-[#574B45] space-y-1 pl-5 list-disc text-[11px] leading-relaxed">
              <li>Pantau status pesanan katering & bento secara realtime</li>
              <li>Simpan data WhatsApp & alamat pengiriman untuk order cepat</li>
              <li>Layanan bantuan langsung via Live Chat Customer Service</li>
            </ul>
          </div>

          {/* Social / One-Click Options */}
          <div className="space-y-2.5">
            <Button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full h-12 bg-white hover:bg-stone-50 text-[#231F20] border-2 border-[#231F20]/15 rounded-full font-display font-bold text-xs uppercase tracking-wider shadow-xs flex items-center justify-center gap-3"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Lanjutkan dengan Akun Google
            </Button>

            <Button
              type="button"
              onClick={handleQuickUserLogin}
              disabled={isLoading}
              className="w-full h-12 bg-[#FF5E14] hover:bg-[#E04F00] text-white rounded-full font-display font-black text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-current" />
              Masuk Cepat (Mode Tamu / Demo)
            </Button>
          </div>

          {/* Form Divider */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-[#231F20]/15"></div>
            <span className="flex-shrink mx-3 text-[10px] uppercase font-bold text-[#8A786E]">Atau Masuk dengan Data Kontak</span>
            <div className="flex-grow border-t border-[#231F20]/15"></div>
          </div>

          {/* Custom Form */}
          <form onSubmit={handleCustomUserSubmit} className="space-y-3">
            <div>
              <Label className="text-xs font-bold text-[#231F20]">Nama Lengkap</Label>
              <div className="relative mt-1">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-[#8A786E]" />
                <Input
                  placeholder="Contoh: Rina Melati"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="pl-10 h-10 rounded-xl bg-white border-[#231F20]/20 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs font-bold text-[#231F20]">No. WhatsApp</Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3.5 top-3 w-3.5 h-3.5 text-[#8A786E]" />
                  <Input
                    placeholder="0812xxxx"
                    value={customPhone}
                    onChange={(e) => setCustomPhone(e.target.value)}
                    className="pl-9 h-10 rounded-xl bg-white border-[#231F20]/20 text-xs"
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs font-bold text-[#231F20]">Email (Opsional)</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3.5 top-3 w-3.5 h-3.5 text-[#8A786E]" />
                  <Input
                    placeholder="email@..."
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    className="pl-9 h-10 rounded-xl bg-white border-[#231F20]/20 text-xs"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !customName.trim()}
              className="w-full h-11 bg-[#7BA03C] hover:bg-[#688A31] text-white rounded-full font-display font-black text-xs uppercase tracking-wider mt-2 shadow-sm"
            >
              <UserCheck className="w-4 h-4 mr-1.5" />
              Mulai Masuk sebagai Member
            </Button>
          </form>

        </div>

      </DialogContent>
    </Dialog>
  );
}
