import React, { useState, useEffect } from 'react';
import { menuService, promoService } from '@/services/dataService';
import { MenuItem, Promo, Variation } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';
import { ChevronRight, ShoppingCart, Star, Plus, Minus, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function Home() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuData, promoData] = await Promise.all([
          menuService.getAll(),
          promoService.getActive()
        ]);
        setMenus(menuData);
        setPromos(promoData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categories = ['Paket Ayam Kremes', 'Ayam Bakar Kremes', 'Nasi Kuning', 'Nasi Tumpeng'];

  return (
    <div className="flex flex-col space-y-16 pb-20 bg-luxury-gray">
      {/* Hero Section */}
      <section className="relative h-[650px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-dark">
          <img 
            src="https://picsum.photos/seed/ayamkremes-luxury/1920/1080?blur=1" 
            alt="Ayam Kremes" 
            className="h-full w-full object-cover opacity-40 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-transparent to-luxury-gray"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="mb-6 text-6xl font-black tracking-tighter text-white md:text-8xl font-heading italic">
                Ayam Kremes <br /> <span className="text-gold non-italic">Jakarta</span>
              </h1>
              <div className="mx-auto h-1 w-24 bg-gold mb-8"></div>
              <p className="mx-auto max-w-2xl text-lg font-light text-white/80 md:text-2xl uppercase tracking-[0.2em]">
                Tradisi Kelezatan Dalam Setiap Gigitan
              </p>
              <div className="mt-12 flex justify-center gap-6">
                <Button size="lg" className="bg-gold hover:bg-gold/80 text-dark font-bold px-10 rounded-none h-14 border border-gold">
                  Explore Menu
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Promos Section */}
      {promos.length > 0 && (
        <section className="container mx-auto px-4 relative -mt-32 z-10">
          <div className="flex flex-col md:flex-row gap-6">
            {promos.map((promo) => (
              <div key={promo.id} className="flex-1 bg-dark text-white p-8 border-l-4 border-gold shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 bg-accent text-white px-4 py-1 text-[10px] font-bold uppercase tracking-widest">Limited Offer</div>
                <h3 className="text-2xl font-bold text-gold mb-2 uppercase tracking-wide">{promo.title}</h3>
                <p className="text-sm text-white/70 mb-6 font-light">{promo.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-black text-white">{promo.discountPercent}% OFF</span>
                  <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-dark px-6 rounded-none">Claim</Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Categories & Menus */}
      <section className="container mx-auto px-4 pt-12">
        <div className="flex flex-col items-center mb-16">
          <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs mb-4">Our Selection</span>
          <h2 className="text-4xl md:text-5xl font-heading italic text-dark text-center">Menu Kami Yang Terkurasi</h2>
          <div className="w-16 h-[2px] bg-gold mt-6"></div>
        </div>

        <div className="space-y-24">
          {/* Main Featured */}
          <div>
             <h3 className="text-sm font-bold uppercase tracking-widest text-gold mb-8 border-l-2 border-gold pl-4">Rekomendasi Chef</h3>
             <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              {menus.filter(m => m.isMain).map((menu) => (
                <MenuCard key={menu.id} menu={menu} isMain onClick={() => { setSelectedMenu(menu); setSelectedVariation(null); }} />
              ))}
            </div>
          </div>

          {/* Regular Categories */}
          {categories.map(cat => {
            const filtered = menus.filter(m => m.category === cat && !m.isMain);
            if (filtered.length === 0) return null;
            return (
              <div key={cat}>
                <h3 className="text-sm font-bold uppercase tracking-widest text-dark/40 mb-8 border-l-2 border-dark/10 pl-4">{cat}</h3>
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                  {filtered.map((menu) => (
                    <MenuCard key={menu.id} menu={menu} onClick={() => { setSelectedMenu(menu); setSelectedVariation(null); }} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Menu Detail Dialog */}
      <Dialog open={!!selectedMenu} onOpenChange={() => setSelectedMenu(null)}>
        <DialogContent className="sm:max-w-[600px] bg-luxury-gray rounded-none border-t-8 border-gold p-0 overflow-hidden">
          {selectedMenu && (
            <div className="flex flex-col md:flex-row h-full">
              <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img src={selectedMenu.imageUrl || undefined} alt={selectedMenu.name} className="h-full w-full object-cover" />
              </div>
              <div className="w-full md:w-1/2 p-8 flex flex-col">
                <DialogHeader className="mb-4">
                  <div className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-1">{selectedMenu.category}</div>
                  <DialogTitle className="text-3xl font-heading italic text-dark">{selectedMenu.name}</DialogTitle>
                </DialogHeader>
                
                <DialogDescription className="text-dark/60 italic font-light leading-relaxed mb-6">
                  {selectedMenu.description}
                </DialogDescription>

                <div className="space-y-4 flex-grow">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-dark/40 border-b border-luxury-border pb-2">Pilih Variasi</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <button 
                      onClick={() => setSelectedVariation(null)}
                      className={`flex justify-between items-center p-3 text-xs font-bold transition-all border ${!selectedVariation ? 'bg-dark text-gold border-dark' : 'bg-white text-dark/60 border-luxury-border hover:border-gold'}`}
                    >
                      <span className="uppercase tracking-tight">Standar</span>
                      <span>Rp{selectedMenu.price.toLocaleString()}</span>
                    </button>
                    {selectedMenu.variations?.map((v, i) => (
                      <button 
                        key={i}
                        onClick={() => setSelectedVariation(v)}
                        className={`flex justify-between items-center p-3 text-xs font-bold transition-all border ${selectedVariation?.name === v.name ? 'bg-dark text-gold border-dark' : 'bg-white text-dark/60 border-luxury-border hover:border-gold'}`}
                      >
                        <span className="uppercase tracking-tight">{v.name}</span>
                        <span>Rp{v.price.toLocaleString()}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-luxury-border">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-bold uppercase text-dark/40">Total Harga</span>
                    <span className="text-xl font-black text-dark">
                      Rp{(selectedVariation?.price || selectedMenu.price).toLocaleString()}
                    </span>
                  </div>
                  <Button 
                    className="w-full bg-gold text-dark hover:bg-gold/80 h-14 rounded-none font-bold uppercase tracking-[0.15em] text-xs"
                    onClick={() => {
                      addToCart(selectedMenu, selectedVariation || undefined);
                      setSelectedMenu(null);
                    }}
                  >
                    Tambah ke Pesanan
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface MenuCardProps {
  menu: MenuItem;
  isMain?: boolean;
  onClick: () => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ menu, isMain, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 border border-luxury-border rounded-none shadow-sm hover:shadow-2xl">
        <div className="relative h-64 overflow-hidden group">
          <img 
            src={menu.imageUrl || "https://picsum.photos/seed/menu/500/500"} 
            alt={menu.name} 
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors"></div>
          {isMain && (
            <div className="absolute top-4 left-4">
                <Badge className="bg-gold text-dark font-bold rounded-none uppercase text-[9px] tracking-widest px-3 py-1 border-none shadow-lg">
                  Signature
                </Badge>
            </div>
          )}
        </div>
        <CardHeader className="flex-grow space-y-2 pt-6">
          <div className="flex justify-between items-start">
             <CardTitle className="text-xl font-bold text-dark font-heading group-hover:text-gold transition-colors">{menu.name}</CardTitle>
          </div>
          <CardDescription className="line-clamp-2 text-dark/60 font-light italic text-sm">{menu.description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-6">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-xs font-bold text-dark/40 uppercase">Pesan</span>
            <span className="text-2xl font-black text-gold">
              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(menu.price)}
            </span>
          </div>
          
          {menu.variations && menu.variations.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {menu.variations.map((v, i) => (
                <span key={i} className="text-[10px] font-bold uppercase tracking-tighter text-dark/50 bg-luxury-gray px-2 py-0.5 border border-luxury-border">
                  {v.name}
                </span>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="p-0 border-t border-luxury-border group">
          <Button 
            onClick={onClick}
            className="w-full flex justify-between items-center h-14 bg-white text-dark hover:bg-gold hover:text-dark transition-all rounded-none font-bold uppercase text-xs tracking-[0.2em] px-8 border-none"
          >
            <span>Detail Menu</span>
            <span className="opacity-40 group-hover:opacity-100 transition-opacity">→</span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
