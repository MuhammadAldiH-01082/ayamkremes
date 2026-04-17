import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { chatService } from '@/services/dataService';
import { ChatMessage } from '@/types';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { MessageCircle, X, Send, UtensilsCrossed } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollArea } from './ui/scroll-area';

export default function ChatWidget() {
  const { user, login, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user && isOpen && !isAdmin) {
      chatService.getOrCreateRoom(user.uid, user.displayName, user.email);
      const unsubscribe = chatService.listenMessages(user.uid, (msgs) => {
        setMessages(msgs);
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      });
      return () => unsubscribe();
    }
  }, [user, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      login();
      return;
    }
    if (!inputText.trim()) return;

    const text = inputText;
    setInputText('');
    await chatService.sendMessage(user.uid, user.uid, user.displayName, text);
  };

  if (isAdmin) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4"
          >
            <Card className="w-80 sm:w-96 border-gold border-t-4 shadow-2xl rounded-none overflow-hidden bg-white">
              <CardHeader className="bg-dark text-white py-4 px-6 flex flex-row items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-gold/20 flex items-center justify-center">
                    <UtensilsCrossed className="h-4 w-4 text-gold" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-heading italic text-gold">Layanan Chat</CardTitle>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Admin Ayam Kremes</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white hover:bg-white/10 h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              
              <CardContent className="p-0 flex flex-col h-96">
                {!user ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
                    <p className="text-xs text-dark/60 italic font-medium">Silakan login untuk memulai obrolan dengan admin kami.</p>
                    <Button onClick={login} className="bg-gold text-dark font-bold rounded-none uppercase text-[10px] tracking-widest px-8">Client Login</Button>
                  </div>
                ) : (
                  <>
                    <ScrollArea className="flex-1 p-6 bg-luxury-gray/30">
                      <div className="space-y-4">
                        {messages.length === 0 && (
                          <div className="text-center py-4">
                            <p className="text-[10px] uppercase font-bold text-dark/20 tracking-widest">Mulai percakapan Anda</p>
                          </div>
                        )}
                        {messages.map((msg) => (
                          <div key={msg.id} className={`flex ${msg.senderId === user.uid ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 text-xs md:text-sm shadow-sm ${
                              msg.senderId === user.uid 
                                ? 'bg-dark text-white rounded-l-2xl rounded-tr-2xl' 
                                : 'bg-white text-dark border border-luxury-border rounded-r-2xl rounded-tl-2xl'
                            }`}>
                              <p className="font-medium">{msg.text}</p>
                              <p className={`text-[8px] mt-1 uppercase font-bold tracking-tighter opacity-40 ${msg.senderId === user.uid ? 'text-right' : 'text-left'}`}>
                                {msg.timestamp?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || 'Baru Saja'}
                              </p>
                            </div>
                          </div>
                        ))}
                        <div ref={scrollRef} />
                      </div>
                    </ScrollArea>
                    <form onSubmit={handleSend} className="p-4 border-t border-luxury-border flex gap-2 bg-white">
                      <Input 
                        placeholder="Ketik pesan..." 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="rounded-none border-luxury-border text-xs"
                      />
                      <Button type="submit" size="icon" className="bg-dark text-gold hover:bg-gold hover:text-dark rounded-none shrink-0">
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-dark text-gold flex items-center justify-center shadow-2xl border-2 border-gold relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gold opacity-0 group-hover:opacity-10 transition-opacity"></div>
        <MessageCircle className="h-6 w-6 z-10" />
      </motion.button>
    </div>
  );
}
