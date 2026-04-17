import React, { useState, useEffect, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { menuService, promoService, orderService, chatService } from '@/services/dataService';
import { MenuItem, Promo, Category, Variation, Order, ChatRoom, ChatMessage } from '@/types';
import { Plus, Trash2, Edit3, Save, X, Utensils, Tag, Package, Clock, CircleDashed, Upload, MessageSquare, Send } from 'lucide-react';
import { toast } from 'sonner';
import { fileToBase64 } from '@/lib/imageUtils';
import { useAuth } from '@/contexts/AuthContext';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function AdminDashboard() {
  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-luxury-gray">
      {/* Side Navigation */}
      <aside className="w-64 bg-dark text-white flex flex-col p-6 shadow-2xl">
        <div className="brand font-heading italic text-xl text-gold mb-10 pb-6 border-b border-white/10 uppercase tracking-widest">
            Ayam Kremes<br /><span className="text-white not-italic">Jakarta Admin</span>
        </div>
        <nav className="flex-grow">
          <ul className="space-y-2">
            <li className="bg-gold text-dark font-bold px-4 py-3 rounded-md cursor-pointer flex items-center gap-3">
               <Utensils className="h-4 w-4" /> <span>Dashboard</span>
            </li>
            <li className="px-4 py-3 text-white/50 hover:bg-white/5 hover:text-white transition-all cursor-pointer flex items-center gap-3">
               <MessageSquare className="h-4 w-4" /> <span>Pesan Pelanggan</span>
            </li>
          </ul>
        </nav>
        <div className="mt-auto pt-6 border-t border-white/10 opacity-30 text-[10px] tracking-widest uppercase">
          &copy; 2026 AKJ Management
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-10 flex justify-between items-center bg-white p-6 border border-luxury-border shadow-sm">
           <div>
              <h1 className="text-3xl font-heading italic text-dark mb-1">Catering Manager</h1>
              <p className="text-xs font-bold uppercase tracking-widest text-dark/30">Admin Content & Order System</p>
           </div>
           <div className="flex items-center gap-4 border-l pl-4 border-luxury-border">
              <div className="text-right">
                 <p className="text-sm font-bold text-dark uppercase tracking-tighter">Aldi Hidayatulloh</p>
                 <Badge className="bg-gold text-dark text-[9px] px-2 py-0 border-none">Administrator</Badge>
              </div>
           </div>
        </header>

        <Tabs defaultValue="menu" className="w-full">
          <TabsList className="bg-dark/10 p-1 mb-8 rounded-none">
            <TabsTrigger value="menu" className="data-[state=active]:bg-dark data-[state=active]:text-white rounded-none px-8 font-bold text-xs uppercase tracking-widest">
              Menu Items
            </TabsTrigger>
            <TabsTrigger value="promo" className="data-[state=active]:bg-dark data-[state=active]:text-white rounded-none px-8 font-bold text-xs uppercase tracking-widest">
              Promotions
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-dark data-[state=active]:text-white rounded-none px-8 font-bold text-xs uppercase tracking-widest">
              Incoming Orders
            </TabsTrigger>
            <TabsTrigger value="chat" className="data-[state=active]:bg-dark data-[state=active]:text-white rounded-none px-8 font-bold text-xs uppercase tracking-widest">
              Messages
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="menu" className="animate-in fade-in slide-in-from-bottom-2 focus-visible:outline-none">
            <MenuManager />
          </TabsContent>
          <TabsContent value="promo" className="animate-in fade-in slide-in-from-bottom-2 focus-visible:outline-none">
            <PromoManager />
          </TabsContent>
          <TabsContent value="orders" className="animate-in fade-in slide-in-from-bottom-2 focus-visible:outline-none">
            <OrderManager />
          </TabsContent>
          <TabsContent value="chat" className="animate-in fade-in slide-in-from-bottom-2 focus-visible:outline-none">
            <ChatManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

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
    try {
      if (!formData.imageUrl) {
        toast.error("Wajib mengunggah foto menu");
        return;
      }
      if (editingId) {
        await menuService.update(editingId, formData);
        toast.success("Menu updated successfully");
      } else {
        await menuService.add(formData);
        toast.success("New menu created");
      }
      setFormData({
        name: '', description: '', price: 0, category: 'Paket Ayam Kremes',
        imageUrl: '', isMain: false, variations: []
      });
      setIsAdding(false);
      setEditingId(null);
      loadMenus();
    } catch (e) {
      toast.error("Failed to save changes");
    }
  };

  const handleEdit = (menu: MenuItem) => {
    setFormData({
      name: menu.name,
      description: menu.description,
      price: menu.price,
      category: menu.category,
      imageUrl: menu.imageUrl,
      isMain: menu.isMain,
      variations: menu.variations || []
    });
    setEditingId(menu.id);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this menu forever?")) {
      await menuService.delete(id);
      toast.success("Menu removed");
      loadMenus();
    }
  };

  const addVariation = () => {
    setFormData({
      ...formData,
      variations: [...formData.variations, { name: '', price: 0 }]
    });
  };

  const updateVariation = (index: number, field: keyof Variation, value: string | number) => {
    const newVars = [...formData.variations];
    newVars[index] = { ...newVars[index], [field]: value };
    setFormData({ ...formData, variations: newVars });
  };

  const removeVariation = (index: number) => {
    const newVars = formData.variations.filter((_, i) => i !== index);
    setFormData({ ...formData, variations: newVars });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 800000) {
        toast.error("File terlalu besar (Maks 800KB)");
        return;
      }
      const base64 = await fileToBase64(file);
      setFormData({ ...formData, imageUrl: base64 });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        {isAdding ? (
          <Card className="border border-gold shadow-xl rounded-none sticky top-8">
            <CardHeader className="bg-dark text-white p-6">
              <CardTitle className="text-xl font-heading italic text-gold">{editingId ? 'Edit Perubahan' : 'Menu Baru'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest">Unggah Foto Menu</Label>
                <div 
                  className="h-40 w-full border-2 border-dashed border-luxury-border flex items-center justify-center relative cursor-pointer overflow-hidden group hover:border-gold transition-colors bg-luxury-gray"
                  onClick={() => document.getElementById('menu-image')?.click()}
                >
                  {formData.imageUrl ? (
                    <>
                      <img src={formData.imageUrl || undefined} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-dark/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <Upload className="text-white h-6 w-6" />
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <Plus className="mx-auto h-8 w-8 text-dark/20" />
                      <span className="text-[10px] font-bold text-dark/40 uppercase">Pilih File</span>
                    </div>
                  )}
                </div>
                <input type="file" id="menu-image" className="hidden" accept="image/*" onChange={handleFileChange} />
              </div>

              <div className="space-y-2 pt-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest">Detail Menu</Label>
                <Input className="rounded-none border-luxury-border" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Nama Menu" />
                <select 
                  className="w-full rounded-none border border-luxury-border bg-background px-3 py-2 text-sm shadow-sm"
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value as Category })}
                >
                  <option>Paket Ayam Kremes</option>
                  <option>Ayam Bakar Kremes</option>
                  <option>Nasi Kuning</option>
                  <option>Nasi Tumpeng</option>
                  <option>Lainnya</option>
                </select>
                <Input type="number" className="rounded-none border-luxury-border" value={formData.price} onChange={e => setFormData({ ...formData, price: Number(e.target.value) })} placeholder="Harga Dasar (Rp)" />
                <Textarea className="rounded-none border-luxury-border h-24" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Deskripsi..." />
              </div>
              
              <div className="flex items-center space-x-2 pt-2 border-t border-luxury-border py-4">
                <Switch checked={formData.isMain} onCheckedChange={checked => setFormData({ ...formData, isMain: checked })} />
                <Label className="text-xs font-bold uppercase tracking-wide cursor-pointer">Menu Unggulan</Label>
              </div>

              <div className="space-y-4 pt-4 border-t border-luxury-border">
                <div className="flex justify-between items-center">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-gold text-[10px]">Variasi Porsi / Isi</Label>
                  <Button type="button" variant="ghost" size="sm" onClick={addVariation} className="text-[10px] uppercase font-bold text-dark hover:text-gold">
                    Add Variation +
                  </Button>
                </div>
                {formData.variations.map((v, i) => (
                  <div key={i} className="flex gap-2 items-center bg-luxury-gray p-2 border border-luxury-border">
                    <Input className="bg-white rounded-none h-8 text-xs" placeholder="Nama" value={v.name} onChange={e => updateVariation(i, 'name', e.target.value)} />
                    <Input type="number" className="bg-white rounded-none h-8 text-xs w-24" placeholder="Harga" value={v.price} onChange={e => updateVariation(i, 'price', Number(e.target.value))} />
                    <Button variant="ghost" size="icon" onClick={() => removeVariation(i)}>
                      <X className="h-3 w-3 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 pt-6">
                <Button onClick={handleSave} className="bg-gold text-dark hover:bg-gold/80 rounded-none h-12 font-bold uppercase text-xs tracking-widest">
                  Simpan Konten
                </Button>
                <Button variant="ghost" onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-xs font-bold uppercase underline underline-offset-4">
                  Batalkan
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6 sticky top-8">
            <Card className="bg-dark text-white rounded-none border-none overflow-hidden">
               <CardHeader>
                  <CardTitle className="text-lg text-gold font-heading italic">Overview</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4 pt-0">
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                     <span className="text-xs font-light tracking-widest opacity-60">JUMLAH MENU</span>
                     <span className="text-xl font-bold">{menus.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-xs font-light tracking-widest opacity-60">UNGGULAN</span>
                     <span className="text-xl font-bold">{menus.filter(m => m.isMain).length}</span>
                  </div>
               </CardContent>
            </Card>
            <Button onClick={() => setIsAdding(true)} className="w-full h-16 bg-gold text-dark hover:bg-gold/90 rounded-none font-bold uppercase tracking-widest text-sm shadow-xl transition-all">
               Tambah Menu Baru +
            </Button>
          </div>
        )}
      </div>

      <div className="lg:col-span-2">
        <div className="bg-white border border-luxury-border shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-dark text-white uppercase text-[10px] tracking-widest font-bold">
              <tr>
                <th className="px-6 py-4">Menu Selection</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-luxury-border">
              {menus.map(menu => (
                <tr key={menu.id} className="hover:bg-luxury-gray transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-luxury-gray border border-luxury-border flex-shrink-0 overflow-hidden">
                         <img src={menu.imageUrl || undefined} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-dark">{menu.name}</div>
                        {menu.isMain && <span className="text-[9px] font-black bg-accent text-white px-2 py-0.5 uppercase tracking-tighter">FEATURED</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold uppercase text-dark/40 px-3 py-1 bg-luxury-border">{menu.category}</span>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-gold">
                    Rp{menu.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(menu)} className="text-xs font-bold text-gold hover:text-dark">EDIT</Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(menu.id)} className="text-xs font-bold text-destructive">DELETE</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {menus.length === 0 && (
             <div className="p-20 text-center text-dark/20 uppercase tracking-[0.3em] font-bold">Belum ada konten menu</div>
          )}
        </div>
      </div>
    </div>
  );
}

function OrderManager() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      const data = await orderService.getAll();
      setOrders(data);
    } catch (e) {
      toast.error("Gagal mengambil data pesanan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id: string, status: Order['status']) => {
    try {
      await orderService.updateStatus(id, status);
      toast.success("Status pesanan diperbarui");
      loadOrders();
    } catch (e) {
      toast.error("Gagal update");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex gap-4">
        <div className="bg-white p-6 border border-luxury-border flex-1">
           <div className="flex items-center gap-3 text-gold mb-2">
              <Clock className="h-5 w-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Antrean</span>
           </div>
           <p className="text-3xl font-black text-dark">{orders.filter(o => o.status === 'Pending').length}</p>
        </div>
        <div className="bg-white p-6 border border-luxury-border flex-1">
           <div className="flex items-center gap-3 text-accent mb-2">
              <CircleDashed className="h-5 w-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Diproses</span>
           </div>
           <p className="text-3xl font-black text-dark">{orders.filter(o => o.status === 'Processing').length}</p>
        </div>
      </div>

      <div className="bg-white border border-luxury-border overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-dark text-white text-[10px] font-bold uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">Pelanggan</th>
              <th className="px-6 py-4">Pesanan</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-luxury-border">
            {orders.map(order => (
              <tr key={order.id} className="hover:bg-luxury-gray transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-dark">{order.customerName}</div>
                  <div className="text-[10px] text-dark/40">{order.customerEmail}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-[10px] text-dark/60 italic leading-tight">
                     {order.items.map(i => `${i.name} (${i.selectedVariation?.name || 'Standard'}) x${i.quantity}`).join(', ')}
                  </div>
                </td>
                <td className="px-6 py-4">
                   <div className="font-black text-dark">Rp{order.totalAmount.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4">
                  <Badge className={`rounded-none border-none py-1 px-4 ${
                    order.status === 'Pending' ? 'bg-gold text-dark' : 
                    order.status === 'Processing' ? 'bg-accent text-white' : 
                    order.status === 'Completed' ? 'bg-green-600 text-white' : 'bg-dark/10 text-dark'
                  }`}>
                    {order.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-1">
                    {order.status === 'Pending' && (
                      <Button variant="ghost" size="sm" onClick={() => updateStatus(order.id, 'Processing')} className="text-[10px] font-black uppercase text-gold">PROSES</Button>
                    )}
                    {order.status === 'Processing' && (
                      <Button variant="ghost" size="sm" onClick={() => updateStatus(order.id, 'Completed')} className="text-[10px] font-black uppercase text-green-600">SELESAI</Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <div className="p-12 text-center text-dark/20 uppercase tracking-widest font-bold">Belum ada pesanan masuk</div>
        )}
      </div>
    </div>
  );
}

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
    await chatService.sendMessage(selectedRoomId, user.uid, "Admin AKJ", text);
  };

  const activeRoom = rooms.find(r => r.id === selectedRoomId);

  return (
    <div className="flex bg-white border border-luxury-border h-[600px] shadow-sm overflow-hidden">
      {/* Rooms List */}
      <div className="w-80 border-r border-luxury-border flex flex-col bg-luxury-gray/10">
        <div className="p-4 bg-dark text-white text-[10px] font-bold uppercase tracking-widest">Customer Chats</div>
        <ScrollArea className="flex-1">
          <div className="divide-y divide-luxury-border">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedRoomId(room.id)}
                className={`w-full p-4 text-left transition-all hover:bg-gold/5 flex flex-col gap-1 ${
                  selectedRoomId === room.id ? 'bg-white border-l-4 border-l-gold' : ''
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-dark text-xs uppercase truncate">{room.userName}</span>
                  <span className="text-[8px] text-dark/30 font-bold uppercase">
                    {room.lastUpdatedAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || 'Active'}
                  </span>
                </div>
                {room.lastMessage && (
                  <p className="text-[10px] text-dark/50 truncate italic pr-4">"{room.lastMessage}"</p>
                )}
              </button>
            ))}
            {rooms.length === 0 && (
              <div className="p-8 text-center text-dark/20 uppercase text-[10px] font-bold">No active conversations</div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        {selectedRoomId ? (
          <>
            <div className="p-4 border-b border-luxury-border flex justify-between items-center bg-luxury-gray/20">
              <div>
                <h4 className="font-heading italic text-dark text-lg">{activeRoom?.userName}</h4>
                <p className="text-[10px] text-dark/40 uppercase font-bold tracking-widest">{activeRoom?.userEmail}</p>
              </div>
            </div>
            
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.senderId === user?.uid ? 'justify-end' : 'justify-start'}`}>
                    <div className="max-w-[70%]">
                      <div className={`p-4 text-xs md:text-sm shadow-sm ${
                        msg.senderId === user?.uid 
                          ? 'bg-dark text-white rounded-l-2xl rounded-tr-2xl' 
                          : 'bg-gold/10 text-dark border border-gold/20 rounded-r-2xl rounded-tl-2xl'
                      }`}>
                        <p className="font-medium whitespace-pre-wrap">{msg.text}</p>
                      </div>
                      <p className={`text-[8px] mt-1 uppercase font-bold tracking-tighter opacity-40 ${msg.senderId === user?.uid ? 'text-right' : 'text-left'}`}>
                        {msg.timestamp?.toDate().toLocaleTimeString() || 'Sending...'}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            <form onSubmit={handleSend} className="p-6 border-t border-luxury-border flex gap-3 bg-white">
              <Input 
                placeholder="Type response..." 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="rounded-none h-12 border-luxury-border hover:border-gold transition-colors focus:ring-0"
              />
              <Button type="submit" className="bg-dark text-gold hover:bg-gold hover:text-dark h-12 px-8 rounded-none font-bold uppercase tracking-widest text-xs">
                <Send className="h-4 w-4 mr-2" /> SEND
              </Button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center opacity-10">
            <MessageSquare size={120} />
            <p className="text-xl font-heading italic mt-4">Select a conversation to start</p>
          </div>
        )}
      </div>
    </div>
  );
}

function PromoManager() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Promo, 'id' | 'createdAt'>>({
    title: '',
    description: '',
    imageUrl: '',
    discountPercent: 0,
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
    try {
      if (!formData.imageUrl) {
        toast.error("Wajib mengunggah foto promo");
        return;
      }
      if (editingId) {
        await promoService.update(editingId, formData);
        toast.success("Promo update published");
      } else {
        await promoService.add(formData);
        toast.success("New promotion launched");
      }
      setFormData({ title: '', description: '', imageUrl: '', discountPercent: 0, active: true });
      setIsAdding(false);
      setEditingId(null);
      loadPromos();
    } catch (e) {
      toast.error("Operation failed");
    }
  };

  const handleEdit = (p: Promo) => {
    setFormData({
      title: p.title,
      description: p.description,
      imageUrl: p.imageUrl,
      discountPercent: p.discountPercent,
      active: p.active
    });
    setEditingId(p.id);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Cancel this promotion?")) {
      await promoService.delete(id);
      toast.success("Promo terminated");
      loadPromos();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 800000) {
        toast.error("File terlalu besar");
        return;
      }
      const base64 = await fileToBase64(file);
      setFormData({ ...formData, imageUrl: base64 });
    }
  };

  return (
    <div className="space-y-10">
      <div className="bg-dark p-10 flex border-b-8 border-gold relative overflow-hidden">
         <div className="absolute right-0 top-0 opacity-10 scale-150 rotate-12 text-gold">
            <Tag size={200} />
         </div>
         <div className="relative z-10">
            <h3 className="text-4xl font-heading italic text-gold mb-2 uppercase tracking-tighter">Luxury Campaigns</h3>
            <p className="text-white/40 uppercase tracking-[0.2em] text-xs">Atur penawaran eksklusif dan promo spesial</p>
         </div>
         <Button onClick={() => setIsAdding(true)} className="ml-auto mt-auto self-end bg-gold text-dark h-12 px-10 rounded-none font-bold uppercase text-xs tracking-widest border border-gold hover:bg-gold/80 transition-all">
            Launch New Promo +
         </Button>
      </div>

      {isAdding && (
        <Card className="border-gold shadow-2xl rounded-none container max-w-2xl mx-auto">
          <CardHeader className="bg-dark text-white p-8">
            <CardTitle className="text-2xl font-heading italic text-gold">{editingId ? 'Edit Campaign' : 'New Campaign Detail'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-8 p-8">
            <div className="space-y-2">
              <Label className="uppercase text-[10px] font-bold text-dark/40">Banner Foto Campaign</Label>
              <div 
                className="h-40 w-full border-2 border-dashed border-luxury-border flex items-center justify-center relative cursor-pointer overflow-hidden group hover:border-gold transition-colors bg-luxury-gray"
                onClick={() => document.getElementById('promo-image')?.click()}
              >
                {formData.imageUrl ? (
                  <>
                    <img src={formData.imageUrl || undefined} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-dark/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <Upload className="text-white h-6 w-6" />
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <Plus className="mx-auto h-8 w-8 text-dark/20" />
                    <span className="text-[10px] font-bold text-dark/40 uppercase">Pilih Foto Banner</span>
                  </div>
                )}
              </div>
              <input type="file" id="promo-image" className="hidden" accept="image/*" onChange={handleFileChange} />
            </div>

            <div className="grid gap-6 md:grid-cols-2 pt-4 border-t border-luxury-border">
              <div className="space-y-2">
                <Label className="uppercase text-[10px] font-bold text-dark/40">Campaign Title</Label>
                <Input className="rounded-none font-bold h-12" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label className="uppercase text-[10px] font-bold text-dark/40">Discount %</Label>
                <Input className="rounded-none font-bold h-12" type="number" value={formData.discountPercent} onChange={e => setFormData({ ...formData, discountPercent: Number(e.target.value) })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="uppercase text-[10px] font-bold text-dark/40">Campaign Mechanics</Label>
              <Textarea className="rounded-none italic h-32" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Jelaskan detail promo..." />
            </div>
            <div className="flex items-center space-x-3 bg-luxury-gray p-4 border border-luxury-border">
              <Switch checked={formData.active} onCheckedChange={active => setFormData({ ...formData, active })} />
              <Label className="uppercase text-xs font-bold tracking-widest cursor-pointer">Live / Active</Label>
            </div>
            <div className="flex justify-end gap-3 pt-6 border-t border-luxury-border">
              <Button variant="ghost" onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-xs font-bold uppercase transition-all">Discard</Button>
              <Button onClick={handleSave} className="bg-gold text-dark hover:bg-gold/80 h-12 px-10 rounded-none font-bold uppercase text-xs tracking-widest transition-all">Publish</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {promos.map(promo => (
          <Card key={promo.id} className={`rounded-none border-l-8 overflow-hidden transition-all hover:scale-[1.02] shadow-sm hover:shadow-2xl ${promo.active ? 'border-gold' : 'border-dark/20 opacity-60'}`}>
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="font-bold text-xl text-dark mb-1">{promo.title}</h4>
                  <Badge className={`${promo.active ? 'bg-accent' : 'bg-dark/10 text-dark'} uppercase text-[8px] font-black rounded-none border-none`}>
                    {promo.active ? "LIVE" : "DRAFT"}
                  </Badge>
                </div>
                <div className="text-4xl font-black text-gold">-{promo.discountPercent}%</div>
              </div>
              <p className="text-sm text-dark/60 font-light italic mb-8 border-l border-luxury-border pl-4 h-12 overflow-hidden line-clamp-2">{promo.description}</p>
              <div className="flex justify-end gap-2 border-t border-luxury-border pt-6">
                 <Button variant="ghost" size="sm" onClick={() => handleEdit(promo)} className="text-[10px] font-black uppercase text-gold hover:text-dark">Edit</Button>
                 <Button variant="ghost" size="sm" onClick={() => handleDelete(promo.id)} className="text-[10px] font-black uppercase text-destructive">Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
