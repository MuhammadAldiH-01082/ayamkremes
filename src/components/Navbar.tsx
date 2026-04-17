import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from './ui/button';
import { LogIn, LogOut, LayoutDashboard, UtensilsCrossed, ShoppingBag, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from './ui/sheet';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { orderService } from '@/services/dataService';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Navbar() {
  const { user, login, logout, isAdmin } = useAuth();
  const { cart, totalItems, totalPrice, removeFromCart, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Silakan login untuk memesan");
      login();
      return;
    }
    
    if (cart.length === 0) return;

    try {
      setIsCheckingOut(true);
      await orderService.add({
        customerName: user.displayName,
        customerEmail: user.email,
        items: cart,
        totalAmount: totalPrice,
        status: 'Pending'
      });
      toast.success("Pesanan berhasil dikirim! Kami akan segera menghubungi Anda.");
      clearCart();
    } catch (e) {
      toast.error("Gagal mengirim pesanan");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-luxury-border bg-dark py-4 shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <UtensilsCrossed className="h-6 w-6 text-gold" />
          <span className="text-2xl font-bold tracking-tight text-white font-heading italic">
            Ayam Kremes <span className="text-gold">Jakarta</span>
          </span>
        </Link>

        <div className="flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium text-white/80 transition-colors hover:text-gold uppercase tracking-wider">Home</Link>
          
          {/* Cart Drawer */}
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="sm" className="relative text-gold hover:text-white hover:bg-gold/20">
                  <ShoppingBag className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                      {totalItems}
                    </span>
                  )}
                </Button>
              }
            />
            <SheetContent className="bg-luxury-gray border-l-gold border-l-4 w-[400px] sm:w-[540px]">
              <SheetHeader className="pb-6 border-b border-luxury-border">
                <SheetTitle className="text-2xl font-heading italic text-dark">Keranjang Pesanan</SheetTitle>
              </SheetHeader>
              
              <ScrollArea className="h-[calc(100vh-250px)] py-6">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-dark/30 uppercase tracking-widest text-xs font-bold font-sans">
                     Keranjang Kosong
                  </div>
                ) : (
                  <div className="space-y-6 px-1">
                    {cart.map((item, idx) => (
                      <div key={`${item.id}-${idx}`} className="flex gap-4 group">
                        <div className="h-16 w-16 bg-white border border-luxury-border flex-shrink-0 overflow-hidden">
                           <img src={item.imageUrl || undefined} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h4 className="font-bold text-dark text-sm uppercase tracking-tight">{item.name}</h4>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 text-dark/20 hover:text-destructive"
                              onClick={() => removeFromCart(item.id, item.selectedVariation?.name)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-[10px] text-dark/40 uppercase font-bold tracking-tighter">
                            {item.selectedVariation ? item.selectedVariation.name : 'Standar'} x {item.quantity}
                          </p>
                          <p className="font-bold text-gold text-sm mt-1">
                            Rp{((item.selectedVariation?.price || item.price) * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>

              <div className="absolute bottom-0 left-0 right-0 p-8 border-t border-luxury-border bg-white shadow-2xl">
                 <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-dark/40 uppercase tracking-widest">Total Belanja</span>
                    <span className="text-2xl font-black text-dark font-sans">Rp{totalPrice.toLocaleString()}</span>
                 </div>
                 <Button 
                  disabled={cart.length === 0 || isCheckingOut}
                  onClick={handleCheckout}
                  className="w-full bg-dark text-gold hover:bg-gold hover:text-dark h-14 rounded-none font-bold uppercase tracking-[0.2em] text-xs transition-all"
                 >
                   {isCheckingOut ? 'Memproses...' : 'Konfirmasi Pesanan →'}
                 </Button>
                 <p className="text-[10px] text-center mt-4 text-dark/40 font-medium">Melalui sistem ini katering akan menerima pesanan secara langsung.</p>
              </div>
            </SheetContent>
          </Sheet>

          {isAdmin && (
            <Link to="/admin">
              <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-1 text-gold hover:text-white hover:bg-gold/20">
                <LayoutDashboard className="h-4 w-4" />
                <span className="uppercase text-xs font-semibold">Admin Panel</span>
              </Button>
            </Link>
          )}

          {user ? (
            <div className="flex items-center space-x-4">
              <div className="hidden flex-col items-end md:flex">
                <span className="text-xs font-semibold text-gold uppercase">{user.displayName}</span>
                <span className="text-[10px] text-white/50">{user.email}</span>
              </div>
              <Button variant="outline" size="sm" onClick={logout} className="border-gold text-gold hover:bg-gold hover:text-dark">
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            </div>
          ) : (
            <Button size="sm" onClick={login} className="bg-gold text-dark hover:bg-gold/90 font-bold uppercase text-xs px-6">
              <LogIn className="h-4 w-4 mr-2" /> Client Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
