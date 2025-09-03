// File: resources/js/Components/CeurdasChat.jsx
// Disempurnakan oleh Dr. Code - Fully Responsive & Production Ready

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { ScrollArea } from '@/Components/ui/scroll-area';
import { MessageSquare, Send, X } from 'lucide-react';
import axios from 'axios';

// Komponen untuk indikator pengetikan (Typing Indicator)
const TypingIndicator = () => (
    <div className="flex items-center space-x-2">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">C</div>
        <div className="p-3 bg-muted rounded-lg flex items-center space-x-1.5">
            <span className="h-2 w-2 bg-slate-400 rounded-full animate-pulse delay-75"></span>
            <span className="h-2 w-2 bg-slate-400 rounded-full animate-pulse delay-150"></span>
            <span className="h-2 w-2 bg-slate-400 rounded-full animate-pulse delay-300"></span>
        </div>
    </div>
);

export default function CeurdasChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            sender: 'ai',
            text: "Assalamu'alaikum! Ada yang bisa Ceurdas bantu seputar administrasi Gampong Udeung?"
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef(null);

    // Auto-scroll ke pesan terakhir
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
                if (viewport) {
                    viewport.scrollTop = viewport.scrollHeight;
                }
            }, 100); // Beri sedikit jeda agar DOM sempat render
        }
    }, [messages, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { sender: 'user', text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const currentMessages = [...messages, userMessage];
        setMessages(currentMessages);
        setInput('');
        setIsLoading(true);

        try {
            const { data } = await axios.post(route('ceurdas.ask'), {
            question: userMessage.text,
            history: messages // Kirim array 'messages' yang lama sebagai histori
        });
        // Perbarui state dengan jawaban AI
        setMessages((prev) => [...prev, { sender: 'ai', text: data.answer }]);

        } catch (err) {
            console.error(err);
            const fallback = err.response?.data?.answer || 'Maaf, terjadi gangguan. Coba lagi ya.';
            setMessages((prev) => [...prev, { sender: 'ai', text: fallback }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[1000] flex flex-col items-end space-y-3">
            {/* Chat Window */}
            <div
                className={`
                    transition-all duration-300 ease-in-out
                    ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}
                `}
            >
                {/* Responsiveness: Ukuran kartu disesuaikan untuk mobile dan desktop */}
                <Card className="w-[calc(100vw-2rem)] h-[75vh] max-w-md flex flex-col shadow-2xl sm:h-[60vh]">
                    <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                        <CardTitle className="text-lg font-semibold">Asisten Ceurdas</CardTitle>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Tutup obrolan">
                            <X className="h-5 w-5" />
                        </Button>
                    </CardHeader>

                    <CardContent className="flex-1 p-0 overflow-hidden">
                        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
                            <div className="flex flex-col space-y-4">
                                {messages.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={`flex items-end gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {msg.sender === 'ai' && (
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">C</div>
                                        )}
                                        <div
                                            className={`
                                                max-w-[80%] rounded-lg px-3 py-2
                                                break-words whitespace-pre-wrap
                                                ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}
                                            `}
                                        >
                                            <p className="text-sm">{msg.text}</p>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && <TypingIndicator />}
                            </div>
                        </ScrollArea>
                    </CardContent>

                    <CardFooter className="p-4 border-t">
                        <form onSubmit={handleSubmit} className="flex items-center space-x-2 w-full">
                            <Input
                                id="message"
                                placeholder="Tulis pesan Anda..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                autoComplete="off"
                                disabled={isLoading}
                                className="flex-1"
                            />
                            <Button type="submit" size="icon" disabled={isLoading || !input.trim()} aria-label="Kirim pesan">
                                <Send className="h-5 w-5" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            </div>
            
            {/* Toggle Button */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 focus:ring-2 focus:ring-ring focus:ring-offset-2"
                aria-label="Buka obrolan"
            >
                {isOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
            </Button>
        </div>
    );
}