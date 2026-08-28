import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { orderService } from '@/services/dataService';
import { Order, OrderStatus } from '@/types';
import { CONTACT_INFO } from '@/data/defaultCatalogue';
import { 
  User, 
  Package, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Truck, 
  ShoppingBag,
  ExternalLink,
  Edit2,
  Save,
  LogOut,
  X
} from 'lucide-react';
import { toast } from 'sonner';

interface MemberPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChat?: () => void;
  defaultTab?: 'orders' | 'profile' | 'newOrder';
}

export default function MemberPortalModal({ isOpen, onClose, onOpenChat, defaultTab = 'orders' }: MemberPortalModalProps) {
  const { user, userProfile, updateUserProfile, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'newOrder'>(defaultTab);

  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab, isOpen]);

  // Edit Profile Form State
  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // Quick Order State
  const [orderForm, setOrderForm] = useState({
    eventType: 'Syukuran / Pengajian',
    packageChoice: 'Paket Ayam Kremes Spesial (Nasi Kotak Bento)',
    paxCount: 30,
    eventDate: '',
    eventTime: '11:30',
    deliveryAddress: '',
    notes: ''
  });
  const [submittingOrder, setSubmittingOrder] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setDisplayName(userProfile.displayName || '');
      setPhone(userProfile.phone || '');
      setAddress(userProfile.address || '');
      setOrderForm(prev => ({
        ...prev,
        deliveryAddress: userProfile.address || ''
      }));
    }
  }, [userProfile]);

  useEffect(() => {
    if (isOpen && user) {
      fetchUserOrders();
    }
  }, [isOpen, user]);

  const fetchUserOrders = async () => {
    if (!user) return;
    setLoadingOrders(true);
    try {
      const userOrders = await orderService.getUserOrders(user.uid);
      setOrders(userOrders);
    } catch (e) {
      console.warn("Error fetching user orders:", e);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUserProfile({
      displayName,
      phone,
      address
    });
  };

  const handleQuickOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!phone && !userProfile?.phone) {
      toast.error('Mohon lengkapi nomor WhatsApp terlebih dahulu.');
      return;
    }

    setSubmittingOrder(true);
    try {
      const estimatedPricePerPax = 28000;
      const totalAmount = orderForm.paxCount * estimatedPricePerPax;

      const newOrderPayload: Omit<Order, 'id' | 'createdAt'> = {
        userId: user.uid,
        customerName: userProfile?.displayName || displayName || 'Pelanggan',
        customerPhone: userProfile?.phone || phone || '',
        customerEmail: userProfile?.email || user.email || '',
        deliveryAddress: orderForm.deliveryAddress || address || 'Jakarta Area',
        eventType: orderForm.eventType,
        selectedPackage: orderForm.packageChoice,
        paxCount: Number(orderForm.paxCount),
        eventDate: orderForm.eventDate || new Date().toISOString().split('T')[0],
        eventTime: orderForm.eventTime,
        notes: orderForm.notes || '-',
        totalAmount,
        status: 'Pending'
      };

      await orderService.add(newOrderPayload);
      toast.success('Pesanan katering berhasil dicatat di sistem!');
      fetchUserOrders();
      setActiveTab('orders');

      // WhatsApp notification
      const waMsg = `Halo ${CONTACT_INFO.brandName}, saya *${newOrderPayload.customerName}* telah membuat pesanan katering lewat Portal Member:
- Paket: ${newOrderPayload.selectedPackage}
- Porsi: ${newOrderPayload.paxCount} Pax
- Tanggal: ${newOrderPayload.eventDate} Jam ${newOrderPayload.eventTime}
- Lokasi Kirim: ${newOrderPayload.deliveryAddress}
Mohon konfirmasi dan info pembayarannya. Terima kasih!`;
      
      window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(waMsg)}`, '_blank');
    } catch (err) {
      console.error(err);
      toast.error('Gagal mencatat pesanan katering. Silakan hubungi admin via WhatsApp.');
    } finally {
      setSubmittingOrder(false);
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return <Badge className="bg-[#FEBD11] text-[#231F20] border-none font-bold">⏳ Menunggu Konfirmasi</Badge>;
      case 'Diproses':
        return <Badge className="bg-[#3B82F6] text-white border-none font-bold">🔥 Sedang Diproses Dapur</Badge>;
      case 'Dikirim':
        return <Badge className="bg-[#8B5CF6] text-white border-none font-bold">🚚 Sedang Dikirim Kurir</Badge>;
      case 'Selesai':
        return <Badge className="bg-[#7BA03C] text-white border-none font-bold">✅ Selesai</Badge>;
      case 'Dibatalkan':
        return <Badge className="bg-[#EF4444] text-white border-none font-bold">❌ Dibatalkan</Badge>;
      default:
        return <Badge className="bg-stone-500 text-white font-bold">{status}</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-[#FAF4E8] rounded-3xl border-2 border-[#231F20]/20 shadow-2xl text-[#231F20] max-h-[90vh] flex flex-col">
        
        {/* Top Header Card */}
        <div className="bg-[#231F20] text-white p-6 relative overflow-hidden flex-shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FF5E14] text-white flex items-center justify-center font-display font-black text-xl shadow-md">
                {userProfile?.displayName ? userProfile.displayName.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-display font-black text-white tracking-tight uppercase">
                    {userProfile?.displayName || 'Pelanggan Setia'}
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-[#FEBD11] text-[#231F20] text-[10px] font-black uppercase">
                    Member AKJ
                  </span>
                </div>
                <p className="text-white/70 text-xs mt-0.5 flex items-center gap-2">
                  <span>{userProfile?.email || user?.email}</span>
                  {userProfile?.phone && (
                    <>
                      <span>•</span>
                      <span>{userProfile.phone}</span>
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {onOpenChat && (
                <Button
                  size="sm"
                  onClick={() => { onClose(); onOpenChat(); }}
                  className="bg-[#FEBD11] hover:bg-[#E5AA0F] text-[#231F20] rounded-full font-display font-bold text-xs h-9"
                >
                  <MessageCircle className="w-3.5 h-3.5 mr-1.5 fill-current" />
                  Live Chat CS
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { logout(); onClose(); }}
                className="text-white/60 hover:text-white hover:bg-white/10 rounded-full h-9 text-xs"
              >
                <LogOut className="w-3.5 h-3.5 mr-1" />
                Keluar
              </Button>
            </div>
          </div>
        </div>

        {/* Content Tabs Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)} className="w-full">
            <TabsList className="grid grid-cols-3 bg-[#EFE6D5] p-1 rounded-2xl mb-6 border border-[#231F20]/10">
              <TabsTrigger 
                value="orders" 
                className="rounded-xl font-display font-black text-xs uppercase tracking-wider py-2.5 data-[state=active]:bg-white data-[state=active]:text-[#FF5E14] data-[state=active]:shadow-xs"
              >
                <Package className="w-3.5 h-3.5 mr-1.5" />
                Pesanan Saya ({orders.length})
              </TabsTrigger>
              
              <TabsTrigger 
                value="newOrder" 
                className="rounded-xl font-display font-black text-xs uppercase tracking-wider py-2.5 data-[state=active]:bg-white data-[state=active]:text-[#FF5E14] data-[state=active]:shadow-xs"
              >
                <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
                Pesan Katering
              </TabsTrigger>

              <TabsTrigger 
                value="profile" 
                className="rounded-xl font-display font-black text-xs uppercase tracking-wider py-2.5 data-[state=active]:bg-white data-[state=active]:text-[#FF5E14] data-[state=active]:shadow-xs"
              >
                <User className="w-3.5 h-3.5 mr-1.5" />
                Profil & Alamat
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: USER ORDERS */}
            <TabsContent value="orders" className="space-y-4 animate-in fade-in duration-200">
              {loadingOrders ? (
                <div className="py-12 text-center text-xs text-[#8A786E]">
                  <div className="w-6 h-6 border-2 border-[#FF5E14] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  Memuat riwayat pesanan Anda...
                </div>
              ) : orders.length === 0 ? (
                <div className="bg-white rounded-3xl p-8 border-2 border-dashed border-[#231F20]/15 text-center space-y-3">
                  <div className="w-14 h-14 bg-[#FEBD11]/20 rounded-full flex items-center justify-center mx-auto text-[#FF5E14]">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-black text-[#231F20] text-lg uppercase">
                    Belum Ada Pesanan Katering
                  </h3>
                  <p className="text-[#574B45] text-xs max-w-md mx-auto">
                    Anda belum memiliki riwayat pesanan katering. Yuk, buat pesanan syukuran, arisan, atau gathering kantor Anda sekarang!
                  </p>
                  <Button
                    onClick={() => setActiveTab('newOrder')}
                    className="bg-[#FF5E14] hover:bg-[#E04F00] text-white rounded-full font-display font-bold text-xs uppercase px-6 mt-2"
                  >
                    Buat Pesanan Katering Sekarang
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div 
                      key={ord.id}
                      className="bg-white rounded-2xl p-5 border-2 border-[#231F20]/10 shadow-xs hover:border-[#FF5E14]/30 transition-all space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#231F20]/10 pb-3">
                        <div>
                          <p className="font-display font-black text-sm text-[#231F20] uppercase">
                            {ord.selectedPackage || 'Paket Katering Syukuran'}
                          </p>
                          <p className="text-[11px] text-[#8A786E]">
                            Acara: {ord.eventType || 'Katering'} • {ord.paxCount || 30} Pax
                          </p>
                        </div>
                        <div>
                          {getStatusBadge(ord.status)}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#574B45]">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#FF5E14]" />
                          <span>Tgl: {ord.eventDate || 'Menyusul'} ({ord.eventTime || '11:30'} WIB)</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:col-span-2">
                          <MapPin className="w-3.5 h-3.5 text-[#FF5E14] flex-shrink-0" />
                          <span className="truncate">{ord.deliveryAddress || 'Alamat dikonfirmasi via WA'}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#231F20]/5 text-xs">
                        <div>
                          <span className="text-[#8A786E]">Estimasi Total: </span>
                          <span className="font-display font-black text-[#FF5E14] text-sm">
                            Rp {(ord.totalAmount || 0).toLocaleString('id-ID')}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const msg = `Halo Admin Ayam Kremes, saya ingin menanyakan update status pesanan saya (#${ord.id?.substring(0, 6)} - ${ord.selectedPackage}).`;
                            window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#7BA03C]/10 text-[#7BA03C] hover:bg-[#7BA03C]/20 font-display font-bold text-[11px] transition-colors"
                        >
                          <MessageCircle className="w-3 h-3 fill-current" />
                          Chat Konfirmasi Pesanan
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* TAB 2: NEW CATERING ORDER */}
            <TabsContent value="newOrder" className="animate-in fade-in duration-200">
              <form onSubmit={handleQuickOrderSubmit} className="bg-white rounded-3xl p-6 border-2 border-[#231F20]/10 shadow-xs space-y-4">
                <div className="border-b border-[#231F20]/10 pb-3">
                  <h3 className="font-display font-black text-[#231F20] text-base uppercase">
                    Formulir Pemesanan Katering Cepat
                  </h3>
                  <p className="text-[#574B45] text-xs mt-0.5">
                    Data Anda otomatis terhubung dengan akun member untuk tracking realtime.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-bold text-[#231F20]">Pilihan Paket Bento / Katering</Label>
                    <select
                      value={orderForm.packageChoice}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, packageChoice: e.target.value }))}
                      className="w-full h-10 px-3 mt-1 rounded-xl bg-[#FAF4E8] border border-[#231F20]/20 text-xs font-medium"
                    >
                      <option>Paket Ayam Kremes Spesial (Nasi Kotak Bento)</option>
                      <option>Paket Ayam Bakar Madu Rempah (Nasi Kotak Bento)</option>
                      <option>Paket Nasi Kuning Komplit Jakarta</option>
                      <option>Tumpeng Mini Syukuran Nusantara</option>
                      <option>Paket Prasmanan Komplit (Buffet)</option>
                    </select>
                  </div>

                  <div>
                    <Label className="text-xs font-bold text-[#231F20]">Jenis Acara</Label>
                    <select
                      value={orderForm.eventType}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, eventType: e.target.value }))}
                      className="w-full h-10 px-3 mt-1 rounded-xl bg-[#FAF4E8] border border-[#231F20]/20 text-xs font-medium"
                    >
                      <option>Meeting / Lunch Kantor</option>
                      <option>Syukuran / Pengajian / Aqiqah</option>
                      <option>Ulang Tahun / Gathering Keluarga</option>
                      <option>Seminar / Pelatihan / Workshop</option>
                      <option>Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <Label className="text-xs font-bold text-[#231F20]">Perkiraan Jumlah Porsi (Pax)</Label>
                    <Input
                      type="number"
                      min="10"
                      value={orderForm.paxCount}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, paxCount: Number(e.target.value) }))}
                      className="h-10 mt-1 rounded-xl bg-[#FAF4E8] border-[#231F20]/20 text-xs"
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-bold text-[#231F20]">Tanggal & Jam Pengiriman</Label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <Input
                        type="date"
                        value={orderForm.eventDate}
                        onChange={(e) => setOrderForm(prev => ({ ...prev, eventDate: e.target.value }))}
                        className="h-10 rounded-xl bg-[#FAF4E8] border-[#231F20]/20 text-xs"
                      />
                      <Input
                        type="time"
                        value={orderForm.eventTime}
                        onChange={(e) => setOrderForm(prev => ({ ...prev, eventTime: e.target.value }))}
                        className="h-10 rounded-xl bg-[#FAF4E8] border-[#231F20]/20 text-xs"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <Label className="text-xs font-bold text-[#231F20]">Alamat Pengiriman</Label>
                    <Input
                      placeholder="Contoh: Gedung Artha Graha Lt. 12, SCBD, Jakarta Selatan"
                      value={orderForm.deliveryAddress}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, deliveryAddress: e.target.value }))}
                      className="h-10 mt-1 rounded-xl bg-[#FAF4E8] border-[#231F20]/20 text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Label className="text-xs font-bold text-[#231F20]">Catatan Khusus (Level Pedas / Request Menu)</Label>
                    <Input
                      placeholder="Contoh: Sambal dipisah, minta sendok garpu higienis"
                      value={orderForm.notes}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, notes: e.target.value }))}
                      className="h-10 mt-1 rounded-xl bg-[#FAF4E8] border-[#231F20]/20 text-xs"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={submittingOrder}
                    className="w-full h-12 bg-[#FF5E14] hover:bg-[#E04F00] text-white rounded-full font-display font-black text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Kirim & Simpan Pesanan Katering ke Database
                  </Button>
                </div>
              </form>
            </TabsContent>

            {/* TAB 3: PROFILE & ADDRESS */}
            <TabsContent value="profile" className="animate-in fade-in duration-200">
              <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl p-6 border-2 border-[#231F20]/10 shadow-xs space-y-4">
                <div className="border-b border-[#231F20]/10 pb-3">
                  <h3 className="font-display font-black text-[#231F20] text-base uppercase">
                    Informasi Profil Member
                  </h3>
                  <p className="text-[#574B45] text-xs mt-0.5">
                    Perbarui data kontak Anda untuk mempercepat pemesanan katering berikutnya.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label className="text-xs font-bold text-[#231F20]">Nama Lengkap</Label>
                    <Input
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="h-10 mt-1 rounded-xl bg-[#FAF4E8] border-[#231F20]/20 text-xs"
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-bold text-[#231F20]">Email Terdaftar</Label>
                    <Input
                      disabled
                      value={userProfile?.email || user?.email || ''}
                      className="h-10 mt-1 rounded-xl bg-stone-100 border-[#231F20]/10 text-xs opacity-75"
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-bold text-[#231F20]">No. WhatsApp Aktif</Label>
                    <Input
                      placeholder="0812xxxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-10 mt-1 rounded-xl bg-[#FAF4E8] border-[#231F20]/20 text-xs"
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-bold text-[#231F20]">Alamat Pengiriman Utama</Label>
                    <Input
                      placeholder="Alamat kantor / rumah"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="h-10 mt-1 rounded-xl bg-[#FAF4E8] border-[#231F20]/20 text-xs"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full h-11 bg-[#7BA03C] hover:bg-[#688A31] text-white rounded-full font-display font-bold text-xs uppercase shadow-sm flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Simpan Perubahan Profil
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>

      </DialogContent>
    </Dialog>
  );
}
