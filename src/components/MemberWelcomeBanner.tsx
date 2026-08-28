import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { orderService } from '@/services/dataService';
import { Order } from '@/types';
import { 
  Package, 
  Clock, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  ShoppingBag, 
  UserCheck, 
  LogOut, 
  CheckCircle2, 
  Sparkles,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MemberWelcomeBannerProps {
  onOpenPortal: (tab?: 'orders' | 'profile' | 'newOrder') => void;
}

export default function MemberWelcomeBanner({ onOpenPortal }: MemberWelcomeBannerProps) {
  const { user, userProfile, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      orderService.getUserOrders(user.uid)
        .then(data => setOrders(data))
        .catch(() => setOrders([]))
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (!user || userProfile?.role === 'admin') return null;

  const activeOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Diproses' || o.status === 'Dikirim');
  const latestOrder = orders[0];

  return (
    <div className="bg-[#231F20] text-white border-b-2 border-[#FF5E14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          
          {/* Left: User Identity & Sapaan */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FF5E14] text-white flex items-center justify-center font-display font-black text-xl flex-shrink-0 shadow-md">
              {userProfile?.displayName ? userProfile.displayName.charAt(0).toUpperCase() : 'M'}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-display font-bold uppercase tracking-wider text-[#FEBD11]">
                  Member Ayam Kremes Jakarta
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-stone-300">
                  <UserCheck className="w-3 h-3 text-[#7BA03C]" />
                  Terverifikasi
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-display font-black uppercase text-white tracking-tight">
                Halo, {userProfile?.displayName || 'Pelanggan Setia'}! 👋
              </h2>
              <p className="text-xs text-stone-400">
                {userProfile?.phone ? `No. WA: ${userProfile.phone}` : 'Belum ada no. WhatsApp'} • {userProfile?.address ? `${userProfile.address.substring(0, 35)}...` : 'Alamat belum diatur'}
              </p>
            </div>
          </div>

          {/* Center / Right: Quick Status & Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Active order chip if any */}
            {activeOrders.length > 0 ? (
              <button
                onClick={() => onOpenPortal('orders')}
                className="bg-[#FEBD11]/20 hover:bg-[#FEBD11]/30 border border-[#FEBD11]/40 text-[#FEBD11] px-3.5 py-2 rounded-xl text-xs font-display font-bold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <div className="w-2 h-2 rounded-full bg-[#FEBD11] animate-ping" />
                <span>{activeOrders.length} Pesanan Sedang Diproses</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            ) : latestOrder ? (
              <button
                onClick={() => onOpenPortal('orders')}
                className="bg-white/10 hover:bg-white/15 border border-white/15 text-stone-300 px-3.5 py-2 rounded-xl text-xs font-display font-bold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Package className="w-3.5 h-3.5 text-[#7BA03C]" />
                <span>{orders.length} Riwayat Pesanan</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            ) : null}

            {/* Quick Actions */}
            <Button
              size="sm"
              onClick={() => onOpenPortal('orders')}
              className="bg-white hover:bg-stone-100 text-[#231F20] rounded-full font-display font-bold text-xs uppercase tracking-wider h-9 px-3.5"
            >
              <Package className="w-3.5 h-3.5 mr-1.5 text-[#FF5E14]" />
              Pesanan Saya
            </Button>

            <Button
              size="sm"
              onClick={() => onOpenPortal('newOrder')}
              className="bg-[#FF5E14] hover:bg-[#E04F00] text-white rounded-full font-display font-black text-xs uppercase tracking-wider h-9 px-3.5 shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
              Pesan Katering
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={logout}
              className="bg-transparent hover:bg-white/10 text-stone-300 hover:text-white border-white/20 rounded-full font-display font-bold text-xs uppercase tracking-wider h-9 px-3"
            >
              <LogOut className="w-3.5 h-3.5 mr-1" />
              Keluar
            </Button>
          </div>

        </div>

      </div>
    </div>
  );
}
