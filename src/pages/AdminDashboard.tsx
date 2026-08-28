import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  menuService, 
  promoService, 
  orderService, 
  chatService, 
  databaseResetService 
} from '@/services/dataService';
import { MenuItem, Promo, Category, Variation, Order, ChatRoom, ChatMessage, OrderStatus } from '@/types';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  Utensils, 
  Tag, 
  Package, 
  Clock, 
  Upload, 
  MessageSquare, 
  Send, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink, 
  LogOut, 
  Phone, 
  Calendar, 
  MapPin,
  Flame,
  Search,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';
import { fileToBase64 } from '@/lib/imageUtils';
import { useAuth, ADMIN_EMAIL } from '@/contexts/AuthContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CONTACT_INFO } from '@/data/defaultCatalogue';

export default function AdminDashboard() {
  const { userProfile, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isResetting, setIsResetting] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleResetDatabase = async () => {
    setIsResetting(true);
    try {
      const result = await databaseResetService.resetAndSeedDatabase();
      toast.success(`Database berhasil di-reset & diisi ulang! (${result.menusCount} Menu, ${result.promosCount} Promo)`);
      setShowResetConfirm(false);
      // Reload page to reflect fresh Firestore data
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (e: any) {
      console.error(e);
      toast.error('Gagal melakukan reset database: ' + (e?.message || 'Error'));
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4EDE0] text-[#231F20] flex flex-col font-sans">
      
      {/* Top Navbar Header */}
      <header className="bg-[#231F20] text-white border-b-4 border-[#FF5E14] sticky top-0 z-40 px-4 sm:px-8 py-3.5 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF5E14] text-white flex items-center justify-center font-black">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-display font-black text-lg tracking-tight uppercase text-white flex items-center gap-2">
                Ayam Kremes <span className="text-[#FF5E14]">Jakarta</span>
                <span className="bg-[#FEBD11] text-[#231F20] text-[10px] px-2 py-0.5 rounded-full font-black uppercase">
                  Admin Panel
                </span>
              </h1>
              <p className="text-[11px] text-white/60 font-mono -mt-0.5">
                Pengelola: {userProfile?.displayName || user?.email || ADMIN_EMAIL}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/">
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs font-display font-bold h-9"
              >
                <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                Lihat Beranda Toko
              </Button>
            </Link>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => { logout(); navigate('/'); }}
              className="rounded-full bg-red-600/80 hover:bg-red-600 text-white text-xs font-display font-bold h-9"
            >
              <LogOut className="w-3.5 h-3.5 mr-1" />
              Keluar
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 flex-1">
        
        {/* Top Action Ribbon */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#231F20]/10 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-display font-black text-[#231F20] uppercase tracking-tight">
              Pusat Manajemen Katering
            </h2>
            <p className="text-[#574B45] text-xs sm:text-sm mt-0.5">
              Kelola katalog menu, pantau pesanan katering masuk, perbarui promo diskon, dan balas pesan pelanggan.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShowResetConfirm(true)}
              variant="outline"
              className="rounded-full border-2 border-red-500/30 text-red-600 hover:bg-red-50 font-display font-black text-xs uppercase tracking-wider h-11 px-5 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4 text-red-500" />
              Reset Database Menu
            </Button>
          </div>
        </div>

        {/* Database Reset Confirmation Card */}
        {showResetConfirm && (
          <div className="bg-red-50 border-2 border-red-300 rounded-3xl p-6 mb-8 text-[#231F20] space-y-4 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-display font-black text-red-700 text-base uppercase">
                  Konfirmasi Hapus & Reset Ulang Database Menu?
                </h4>
                <p className="text-xs text-red-900/80 mt-1 leading-relaxed">
                  Tindakan ini akan membersihkan data menu & promo lama di Firestore, lalu mengisinya kembali (seeding) secara otomatis dengan daftar paket menu standar Ayam Kremes Jakarta yang bersih, lengkap, dan beresolusi tinggi.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowResetConfirm(false)}
                className="rounded-full text-xs font-bold"
              >
                Batal
              </Button>
              <Button
                size="sm"
                disabled={isResetting}
                onClick={handleResetDatabase}
                className="bg-red-600 hover:bg-red-700 text-white rounded-full font-display font-bold text-xs uppercase px-6"
              >
                {isResetting ? 'Sedang Memproses...' : 'Ya, Bersihkan & Inisialisasi Ulang'}
              </Button>
            </div>
          </div>
        )}

        {/* Dashboard Tabs */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="bg-[#E8DFC8] p-1.5 rounded-2xl mb-8 border border-[#231F20]/10 grid grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger 
              value="orders" 
              className="data-[state=active]:bg-[#231F20] data-[state=active]:text-white rounded-xl py-3 font-display font-black text-xs uppercase tracking-wider transition-all"
            >
              <Package className="w-4 h-4 mr-2 text-[#FEBD11]" />
              Pesanan Masuk
            </TabsTrigger>
            
            <TabsTrigger 
              value="menu" 
              className="data-[state=active]:bg-[#231F20] data-[state=active]:text-white rounded-xl py-3 font-display font-black text-xs uppercase tracking-wider transition-all"
            >
              <Utensils className="w-4 h-4 mr-2 text-[#FF5E14]" />
              Katalog Menu
            </TabsTrigger>

            <TabsTrigger 
              value="promo" 
              className="data-[state=active]:bg-[#231F20] data-[state=active]:text-white rounded-xl py-3 font-display font-black text-xs uppercase tracking-wider transition-all"
            >
              <Tag className="w-4 h-4 mr-2 text-[#7BA03C]" />
              Promo & Diskon
            </TabsTrigger>

            <TabsTrigger 
              value="chat" 
              className="data-[state=active]:bg-[#231F20] data-[state=active]:text-white rounded-xl py-3 font-display font-black text-xs uppercase tracking-wider transition-all"
            >
              <MessageSquare className="w-4 h-4 mr-2 text-[#FEBD11]" />
              Pesan Pelanggan
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders" className="animate-in fade-in duration-200">
            <OrderManager />
          </TabsContent>

          <TabsContent value="menu" className="animate-in fade-in duration-200">
            <MenuManager />
          </TabsContent>

          <TabsContent value="promo" className="animate-in fade-in duration-200">
            <PromoManager />
          </TabsContent>

          <TabsContent value="chat" className="animate-in fade-in duration-200">
            <ChatManager />
          </TabsContent>
        </Tabs>

      </main>
    </div>
  );
}

// ----------------------------------------------------
// 1. ORDER MANAGER
// ----------------------------------------------------
function OrderManager() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await orderService.getAll();
      setOrders(data);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await orderService.updateStatus(orderId, newStatus);
      toast.success(`Status pesanan diubah ke: ${newStatus}`);
      loadOrders();
    } catch (e) {
      toast.error('Gagal memperbarui status pesanan.');
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchStatus = filterStatus === 'all' || o.status === filterStatus;
    const matchSearch = searchQuery === '' || 
      o.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.selectedPackage?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Metric Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border-2 border-[#231F20]/10 shadow-xs">
          <div className="flex items-center gap-2 text-[#8A786E] text-xs font-bold uppercase mb-1">
            <Clock className="w-4 h-4 text-[#FEBD11]" />
            <span>Menunggu (Pending)</span>
          </div>
          <p className="text-3xl font-display font-black text-[#231F20]">
            {orders.filter(o => o.status === 'Pending').length}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-[#231F20]/10 shadow-xs">
          <div className="flex items-center gap-2 text-[#8A786E] text-xs font-bold uppercase mb-1">
            <Flame className="w-4 h-4 text-[#3B82F6]" />
            <span>Sedang Diproses</span>
          </div>
          <p className="text-3xl font-display font-black text-[#3B82F6]">
            {orders.filter(o => o.status === 'Diproses').length}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-[#231F20]/10 shadow-xs">
          <div className="flex items-center gap-2 text-[#8A786E] text-xs font-bold uppercase mb-1">
            <Package className="w-4 h-4 text-[#8B5CF6]" />
            <span>Sedang Dikirim</span>
          </div>
          <p className="text-3xl font-display font-black text-[#8B5CF6]">
            {orders.filter(o => o.status === 'Dikirim').length}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-[#231F20]/10 shadow-xs">
          <div className="flex items-center gap-2 text-[#8A786E] text-xs font-bold uppercase mb-1">
            <CheckCircle2 className="w-4 h-4 text-[#7BA03C]" />
            <span>Selesai</span>
          </div>
          <p className="text-3xl font-display font-black text-[#7BA03C]">
            {orders.filter(o => o.status === 'Selesai').length}
          </p>
        </div>
      </div>

      {/* Filter Ribbon */}
      <div className="bg-white p-4 rounded-2xl border-2 border-[#231F20]/10 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#8A786E]" />
          <Input
            placeholder="Cari nama pemesan / paket..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 rounded-xl bg-[#FAF4E8] border-[#231F20]/15 text-xs"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['all', 'Pending', 'Diproses', 'Dikirim', 'Selesai', 'Dibatalkan'].map((st) => (
            <Button
              key={st}
              variant="ghost"
              size="sm"
              onClick={() => setFilterStatus(st)}
              className={`rounded-full text-xs font-display font-bold px-3.5 h-8 ${
                filterStatus === st 
                  ? 'bg-[#231F20] text-white' 
                  : 'text-[#574B45] hover:bg-[#FAF4E8]'
              }`}
            >
              {st === 'all' ? 'Semua' : st}
            </Button>
          ))}
        </div>
      </div>

      {/* Orders List / Table */}
      <div className="bg-white rounded-3xl border-2 border-[#231F20]/10 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-[#8A786E]">
            <div className="w-6 h-6 border-2 border-[#FF5E14] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Memuat daftar pesanan...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-[#8A786E] space-y-2">
            <Package className="w-10 h-10 mx-auto text-[#8A786E]/40" />
            <p className="font-display font-bold uppercase text-sm text-[#231F20]">Tidak ada pesanan yang sesuai.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#231F20]/10">
            {filteredOrders.map((ord) => (
              <div key={ord.id} className="p-6 hover:bg-[#FAF4E8]/50 transition-colors space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="font-display font-black text-base text-[#231F20] uppercase">
                        {ord.customerName}
                      </span>
                      <span className="text-xs text-[#8A786E]">({ord.customerEmail || 'Member App'})</span>
                    </div>
                    <p className="text-xs text-[#FF5E14] font-display font-bold mt-0.5">
                      📦 {ord.selectedPackage || 'Paket Katering Syukuran'} • {ord.paxCount || 30} Pax
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-display font-black text-lg text-[#231F20]">
                      Rp {(ord.totalAmount || 0).toLocaleString('id-ID')}
                    </span>
                    <Badge className={`rounded-full px-3 py-1 font-bold text-xs border-none ${
                      ord.status === 'Pending' ? 'bg-[#FEBD11] text-[#231F20]' :
                      ord.status === 'Diproses' ? 'bg-[#3B82F6] text-white' :
                      ord.status === 'Dikirim' ? 'bg-[#8B5CF6] text-white' :
                      ord.status === 'Selesai' ? 'bg-[#7BA03C] text-white' : 'bg-red-500 text-white'
                    }`}>
                      {ord.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#574B45] bg-[#FAF4E8] p-3 rounded-2xl border border-[#231F20]/5">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#FF5E14]" />
                    <span>Acara: {ord.eventDate || 'Menyusul'} ({ord.eventTime || '11:30'} WIB)</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:col-span-2">
                    <MapPin className="w-3.5 h-3.5 text-[#FF5E14] flex-shrink-0" />
                    <span className="truncate">{ord.deliveryAddress || 'Area Jakarta'}</span>
                  </div>
                  {ord.notes && (
                    <div className="sm:col-span-3 text-[11px] text-[#8A786E] italic mt-1">
                      Catatan: "{ord.notes}"
                    </div>
                  )}
                </div>

                {/* Status Update Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#8A786E]">Ubah Status:</span>
                    <select
                      value={ord.status}
                      onChange={(e) => handleUpdateStatus(ord.id, e.target.value as OrderStatus)}
                      className="h-8 px-2.5 rounded-lg bg-white border border-[#231F20]/20 text-xs font-bold"
                    >
                      <option value="Pending">Pending (Antrean)</option>
                      <option value="Diproses">Diproses (Dapur)</option>
                      <option value="Dikirim">Dikirim (Kurir)</option>
                      <option value="Selesai">Selesai</option>
                      <option value="Dibatalkan">Dibatalkan</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    {ord.customerPhone && (
                      <button
                        type="button"
                        onClick={() => {
                          const msg = `Halo Kak ${ord.customerName}, kami dari Admin ${CONTACT_INFO.brandName} terkait pesanan katering Kakak (#${ord.id?.substring(0, 6)})...`;
                          window.open(`https://wa.me/${ord.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#7BA03C] hover:bg-[#688A31] text-white font-display font-bold text-xs shadow-xs"
                      >
                        <Phone className="w-3 h-3 fill-current" />
                        Chat Pelanggan di WA
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

// ----------------------------------------------------
// 2. MENU MANAGER
// ----------------------------------------------------
function MenuManager() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<MenuItem, 'id' | 'createdAt'>>({
    name: '',
    description: '',
    price: 0,
    category: 'Paket Ayam Kremes',
    imageUrl: '',
    isMain: false,
    spiceLevel: 2,
    badge: '',
    portion: '1 Porsi Lengkap',
    minOrder: 1,
    variations: []
  });

  const loadMenus = async () => {
    const data = await menuService.getAll();
    setMenus(data);
  };

  useEffect(() => {
    loadMenus();
  }, []);

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error("Nama menu wajib diisi");
      return;
    }
    if (!formData.price || formData.price <= 0) {
      toast.error("Harga menu wajib diisi dengan benar");
      return;
    }

    try {
      if (editingId) {
        await menuService.update(editingId, formData);
        toast.success("Menu berhasil diperbarui!");
      } else {
        await menuService.add(formData);
        toast.success("Menu baru berhasil ditambahkan!");
      }
      setFormData({
        name: '', description: '', price: 0, category: 'Paket Ayam Kremes',
        imageUrl: '', isMain: false, spiceLevel: 2, badge: '', portion: '1 Porsi', minOrder: 1, variations: []
      });
      setIsAdding(false);
      setEditingId(null);
      loadMenus();
    } catch (e) {
      toast.error("Gagal menyimpan data menu.");
    }
  };

  const handleEdit = (menu: MenuItem) => {
    setFormData({
      name: menu.name,
      description: menu.description,
      price: menu.price,
      category: menu.category,
      imageUrl: menu.imageUrl || '',
      isMain: menu.isMain || false,
      spiceLevel: menu.spiceLevel || 2,
      badge: menu.badge || '',
      portion: menu.portion || '1 Porsi',
      minOrder: menu.minOrder || 1,
      variations: menu.variations || []
    });
    setEditingId(menu.id);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Hapus menu ini dari katalog?")) {
      await menuService.delete(id);
      toast.success("Menu telah dihapus");
      loadMenus();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1200000) {
        toast.error("Ukuran file terlalu besar (maksimal 1.2MB)");
        return;
      }
      const base64 = await fileToBase64(file);
      setFormData({ ...formData, imageUrl: base64 });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 border-2 border-[#231F20]/10 shadow-xs flex items-center justify-between">
        <div>
          <h3 className="text-xl font-display font-black text-[#231F20] uppercase">
            Daftar Katalog Menu ({menus.length})
          </h3>
          <p className="text-[#574B45] text-xs mt-0.5">
            Kelola menu ayam kremes, nasi bento katering, dan lauk pelengkap.
          </p>
        </div>

        <Button
          onClick={() => {
            setFormData({
              name: '', description: '', price: 25000, category: 'Paket Ayam Kremes',
              imageUrl: '', isMain: false, spiceLevel: 2, badge: 'Favorit', portion: '1 Kotak Bento', minOrder: 1, variations: []
            });
            setEditingId(null);
            setIsAdding(true);
          }}
          className="bg-[#FF5E14] hover:bg-[#E04F00] text-white rounded-full font-display font-black text-xs uppercase tracking-wider px-6 h-11 shadow-sm"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Tambah Menu Baru
        </Button>
      </div>

      {/* Add / Edit Form Modal */}
      {isAdding && (
        <Card className="rounded-3xl border-2 border-[#231F20]/20 shadow-xl bg-white overflow-hidden animate-in fade-in slide-in-from-bottom-2">
          <CardHeader className="bg-[#231F20] text-white p-6">
            <CardTitle className="font-display font-black text-xl uppercase text-white">
              {editingId ? 'Edit Menu Katering' : 'Tambah Menu Baru'}
            </CardTitle>
            <CardDescription className="text-white/70 text-xs">
              Lengkapi informasi menu agar tampil menarik di katalog pelanggan.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6 space-y-5">
            {/* Image Upload Area */}
            <div>
              <Label className="text-xs font-bold text-[#231F20]">Foto Menu (Opsional / Resolusi Rekomendasi 800x600)</Label>
              <div 
                className="h-44 w-full mt-1.5 border-2 border-dashed border-[#231F20]/20 rounded-2xl flex items-center justify-center relative cursor-pointer overflow-hidden group hover:border-[#FF5E14] transition-colors bg-[#FAF4E8]"
                onClick={() => document.getElementById('menu-image-upload')?.click()}
              >
                {formData.imageUrl ? (
                  <>
                    <img src={formData.imageUrl} alt="Menu Preview" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Upload className="text-white h-6 w-6" />
                    </div>
                  </>
                ) : (
                  <div className="text-center p-4">
                    <Plus className="mx-auto h-8 w-8 text-[#8A786E]" />
                    <span className="text-xs font-bold text-[#8A786E] uppercase mt-1 block">Klik untuk Unggah Foto</span>
                  </div>
                )}
              </div>
              <input type="file" id="menu-image-upload" className="hidden" accept="image/*" onChange={handleFileChange} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-bold text-[#231F20]">Nama Menu</Label>
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Paket Ayam Kremes Komplit"
                  className="h-10 mt-1 rounded-xl bg-[#FAF4E8] border-[#231F20]/20 text-xs"
                />
              </div>

              <div>
                <Label className="text-xs font-bold text-[#231F20]">Kategori</Label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                  className="w-full h-10 px-3 mt-1 rounded-xl bg-[#FAF4E8] border border-[#231F20]/20 text-xs font-medium"
                >
                  <option value="Paket Ayam Kremes">Paket Ayam Kremes</option>
                  <option value="Ayam Bakar Kremes">Ayam Bakar Kremes</option>
                  <option value="Nasi Kuning">Nasi Kuning</option>
                  <option value="Nasi Tumpeng">Nasi Tumpeng</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <Label className="text-xs font-bold text-[#231F20]">Harga Dasar (Rp)</Label>
                <Input 
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="h-10 mt-1 rounded-xl bg-[#FAF4E8] border-[#231F20]/20 text-xs"
                />
              </div>

              <div>
                <Label className="text-xs font-bold text-[#231F20]">Label Badge (Opsional)</Label>
                <Input 
                  value={formData.badge || ''}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="Contoh: Terlaris, Best Seller"
                  className="h-10 mt-1 rounded-xl bg-[#FAF4E8] border-[#231F20]/20 text-xs"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-bold text-[#231F20]">Deskripsi Menu & Komposisi</Label>
              <Textarea 
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Nasi pulen, ayam goreng kremes gurih, tahu tempe, sambal bawang pedas, lalapan segar..."
                className="mt-1 rounded-xl bg-[#FAF4E8] border-[#231F20]/20 text-xs h-20"
              />
            </div>

            <div className="flex items-center space-x-3 bg-[#FAF4E8] p-3 rounded-xl border border-[#231F20]/10">
              <Switch 
                checked={formData.isMain} 
                onCheckedChange={(checked) => setFormData({ ...formData, isMain: checked })} 
              />
              <Label className="text-xs font-bold text-[#231F20] cursor-pointer">
                Jadikan Menu Unggulan (Tampil di Hero Utama)
              </Label>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#231F20]/10">
              <Button 
                variant="ghost" 
                onClick={() => { setIsAdding(false); setEditingId(null); }}
                className="rounded-full text-xs font-bold"
              >
                Batal
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-[#7BA03C] hover:bg-[#688A31] text-white rounded-full font-display font-bold text-xs uppercase px-6"
              >
                <Save className="w-4 h-4 mr-1.5" />
                Simpan Menu
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Grid of Menus */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menus.map((menu) => (
          <div 
            key={menu.id} 
            className="bg-white rounded-3xl p-5 border-2 border-[#231F20]/10 shadow-xs hover:border-[#FF5E14]/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="h-44 w-full rounded-2xl overflow-hidden bg-[#FAF4E8] flex items-center justify-center relative">
                {menu.imageUrl ? (
                  <img src={menu.imageUrl} alt={menu.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl">🍗</span>
                )}
                {menu.badge && (
                  <span className="absolute top-2.5 left-2.5 bg-[#FF5E14] text-white text-[10px] font-display font-black px-2.5 py-1 rounded-full uppercase">
                    {menu.badge}
                  </span>
                )}
              </div>

              <div>
                <span className="text-[10px] font-display font-bold text-[#8A786E] uppercase">
                  {menu.category}
                </span>
                <h4 className="font-display font-black text-[#231F20] text-base leading-snug">
                  {menu.name}
                </h4>
                <p className="text-xs text-[#574B45] line-clamp-2 mt-1">
                  {menu.description}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#231F20]/10 flex items-center justify-between">
              <span className="font-display font-black text-[#FF5E14] text-base">
                Rp {menu.price.toLocaleString('id-ID')}
              </span>

              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleEdit(menu)}
                  className="rounded-full text-xs font-bold text-[#231F20] hover:bg-[#FAF4E8]"
                >
                  <Edit3 className="w-3.5 h-3.5 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleDelete(menu.id)}
                  className="rounded-full text-xs font-bold text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

// ----------------------------------------------------
// 3. PROMO MANAGER
// ----------------------------------------------------
function PromoManager() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Promo, 'id' | 'createdAt'>>({
    title: '',
    description: '',
    imageUrl: '',
    discountPercent: 15,
    active: true
  });

  const loadPromos = async () => {
    const data = await promoService.getAll();
    setPromos(data);
  };

  useEffect(() => {
    loadPromos();
  }, []);

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast.error("Judul promo wajib diisi");
      return;
    }

    try {
      if (editingId) {
        await promoService.update(editingId, formData);
        toast.success("Promo berhasil diperbarui!");
      } else {
        await promoService.add(formData);
        toast.success("Promo baru berhasil diluncurkan!");
      }
      setFormData({ title: '', description: '', imageUrl: '', discountPercent: 15, active: true });
      setIsAdding(false);
      setEditingId(null);
      loadPromos();
    } catch (e) {
      toast.error("Gagal menyimpan promo.");
    }
  };

  const handleEdit = (p: Promo) => {
    setFormData({
      title: p.title,
      description: p.description,
      imageUrl: p.imageUrl || '',
      discountPercent: p.discountPercent || 0,
      active: p.active
    });
    setEditingId(p.id);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Hapus promo ini?")) {
      await promoService.delete(id);
      toast.success("Promo telah dihapus");
      loadPromos();
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 border-2 border-[#231F20]/10 shadow-xs flex items-center justify-between">
        <div>
          <h3 className="text-xl font-display font-black text-[#231F20] uppercase">
            Kelola Promo & Diskon Katering ({promos.length})
          </h3>
          <p className="text-[#574B45] text-xs mt-0.5">
            Atur diskon spesial pemesanan porsi banyak dan voucher pelanggan.
          </p>
        </div>

        <Button
          onClick={() => {
            setFormData({
              title: '', description: '', imageUrl: '', discountPercent: 20, active: true
            });
            setEditingId(null);
            setIsAdding(true);
          }}
          className="bg-[#7BA03C] hover:bg-[#688A31] text-white rounded-full font-display font-black text-xs uppercase tracking-wider px-6 h-11 shadow-sm"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Buat Promo Baru
        </Button>
      </div>

      {isAdding && (
        <Card className="rounded-3xl border-2 border-[#231F20]/20 shadow-xl bg-white overflow-hidden animate-in fade-in">
          <CardHeader className="bg-[#231F20] text-white p-6">
            <CardTitle className="font-display font-black text-xl uppercase text-white">
              {editingId ? 'Edit Promo' : 'Buat Promo Baru'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-bold text-[#231F20]">Judul Promo</Label>
                <Input 
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Contoh: Diskon Katering Kantor 20%"
                  className="h-10 mt-1 rounded-xl bg-[#FAF4E8] border-[#231F20]/20 text-xs"
                />
              </div>

              <div>
                <Label className="text-xs font-bold text-[#231F20]">Persentase Diskon (%)</Label>
                <Input 
                  type="number"
                  value={formData.discountPercent}
                  onChange={(e) => setFormData({ ...formData, discountPercent: Number(e.target.value) })}
                  className="h-10 mt-1 rounded-xl bg-[#FAF4E8] border-[#231F20]/20 text-xs"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-bold text-[#231F20]">Deskripsi Syarat & Ketentuan</Label>
              <Textarea 
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Minimal pemesanan 50 pax, berlaku untuk semua paket bento..."
                className="mt-1 rounded-xl bg-[#FAF4E8] border-[#231F20]/20 text-xs h-20"
              />
            </div>

            <div className="flex items-center space-x-3 bg-[#FAF4E8] p-3 rounded-xl border border-[#231F20]/10">
              <Switch 
                checked={formData.active} 
                onCheckedChange={(checked) => setFormData({ ...formData, active: checked })} 
              />
              <Label className="text-xs font-bold text-[#231F20] cursor-pointer">
                Promo Aktif / Ditampilkan
              </Label>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#231F20]/10">
              <Button 
                variant="ghost" 
                onClick={() => { setIsAdding(false); setEditingId(null); }}
                className="rounded-full text-xs font-bold"
              >
                Batal
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-[#7BA03C] hover:bg-[#688A31] text-white rounded-full font-display font-bold text-xs uppercase px-6"
              >
                <Save className="w-4 h-4 mr-1.5" />
                Simpan Promo
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Promos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promos.map((p) => (
          <div 
            key={p.id}
            className={`rounded-3xl p-6 border-2 transition-all shadow-xs flex flex-col justify-between space-y-4 ${
              p.active ? 'bg-white border-[#7BA03C]/30' : 'bg-stone-50 border-stone-200 opacity-60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-display font-black text-[#FF5E14]">
                  -{p.discountPercent}%
                </span>
                <Badge className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase border-none ${
                  p.active ? 'bg-[#7BA03C] text-white' : 'bg-stone-300 text-stone-700'
                }`}>
                  {p.active ? 'AKTIF' : 'NONAKTIF'}
                </Badge>
              </div>

              <h4 className="font-display font-black text-[#231F20] text-lg">
                {p.title}
              </h4>
              <p className="text-xs text-[#574B45] mt-1 line-clamp-3">
                {p.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#231F20]/10 flex items-center justify-end gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleEdit(p)}
                className="rounded-full text-xs font-bold text-[#231F20]"
              >
                <Edit3 className="w-3.5 h-3.5 mr-1" />
                Edit
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleDelete(p.id)}
                className="rounded-full text-xs font-bold text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

// ----------------------------------------------------
// 4. CHAT MANAGER
// ----------------------------------------------------
function ChatManager() {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = chatService.listenRooms(setRooms);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (selectedRoomId) {
      const unsubscribe = chatService.listenMessages(selectedRoomId, (msgs) => {
        setMessages(msgs);
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      });
      return () => unsubscribe();
    }
  }, [selectedRoomId]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoomId || !inputText.trim() || !user) return;

    const text = inputText;
    setInputText('');
    await chatService.sendMessage(selectedRoomId, user.uid, "Admin Ayam Kremes", text);
  };

  const activeRoom = rooms.find(r => r.id === selectedRoomId);

  return (
    <div className="bg-white rounded-3xl border-2 border-[#231F20]/10 shadow-xs overflow-hidden h-[600px] flex flex-col md:flex-row">
      
      {/* Customer Rooms Sidebar */}
      <div className="w-full md:w-80 border-r border-[#231F20]/10 bg-[#FAF4E8] flex flex-col">
        <div className="p-4 bg-[#231F20] text-white">
          <h4 className="font-display font-black text-xs uppercase tracking-wider text-white">
            Obrolan Pelanggan ({rooms.length})
          </h4>
        </div>

        <ScrollArea className="flex-1">
          <div className="divide-y divide-[#231F20]/10">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedRoomId(room.id)}
                className={`w-full p-4 text-left transition-colors flex flex-col gap-1 ${
                  selectedRoomId === room.id ? 'bg-white border-l-4 border-[#FF5E14]' : 'hover:bg-white/60'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-display font-black text-xs text-[#231F20] truncate">
                    {room.userName || 'Pelanggan'}
                  </span>
                </div>
                {room.lastMessage && (
                  <p className="text-[11px] text-[#8A786E] truncate italic">
                    "{room.lastMessage}"
                  </p>
                )}
              </button>
            ))}
            {rooms.length === 0 && (
              <div className="p-8 text-center text-xs text-[#8A786E]">
                Belum ada pesan obrolan aktif.
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Messages Panel */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedRoomId ? (
          <>
            <div className="p-4 border-b border-[#231F20]/10 bg-[#FAF4E8] flex items-center justify-between">
              <div>
                <h4 className="font-display font-black text-sm text-[#231F20] uppercase">
                  {activeRoom?.userName}
                </h4>
                <p className="text-[11px] text-[#8A786E]">{activeRoom?.userEmail}</p>
              </div>
            </div>

            <ScrollArea className="flex-1 p-6 bg-[#FAF4E8]/30">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.senderId === user?.uid ? 'justify-end' : 'justify-start'}`}>
                    <div className="max-w-[75%]">
                      <div className={`p-3.5 text-xs shadow-xs rounded-2xl ${
                        msg.senderId === user?.uid 
                          ? 'bg-[#231F20] text-white rounded-tr-xs' 
                          : 'bg-white text-[#231F20] border border-[#231F20]/10 rounded-tl-xs'
                      }`}>
                        <p className="font-medium">{msg.text}</p>
                      </div>
                      <p className={`text-[9px] mt-1 text-[#8A786E] font-medium ${msg.senderId === user?.uid ? 'text-right' : 'text-left'}`}>
                        {msg.timestamp?.toDate ? msg.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Baru saja'}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            <form onSubmit={handleSend} className="p-4 border-t border-[#231F20]/10 flex gap-2 bg-white">
              <Input
                placeholder="Ketik balasan untuk pelanggan..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="rounded-xl h-11 bg-[#FAF4E8] border-[#231F20]/20 text-xs"
              />
              <Button type="submit" className="bg-[#FF5E14] hover:bg-[#E04F00] text-white rounded-xl h-11 px-6 font-display font-bold text-xs">
                <Send className="w-4 h-4 mr-1.5" /> Balas
              </Button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-[#8A786E] space-y-3">
            <MessageSquare className="w-12 h-12 text-[#8A786E]/30" />
            <p className="font-display font-bold text-sm text-[#231F20]">Pilih obrolan dari daftar untuk mulai membalas pesan.</p>
          </div>
        )}
      </div>

    </div>
  );
}
