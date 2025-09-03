// File: resources/js/Components/CeurdasChat.jsx
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { ScrollArea } from '@/Components/ui/scroll-area';
import { MessageSquare, Send, X, LoaderCircle } from 'lucide-react';
import axios from 'axios';

export default function CeurdasChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'ai', text: 'Assalamu\'alaikum! Ada yang bisa Ceurdas bantu seputar administrasi Gampong Udeung?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
             const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (viewport) {
                viewport.scrollTop = viewport.scrollHeight;
            }
        }
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await axios.post(route('ceurdas.ask'), { question: input });
            const aiMessage = { sender: 'ai', text: response.data.answer };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage = { sender: 'ai', text: 'Maaf, terjadi gangguan. Coba lagi ya.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {/* Chat Window */}
            <div className={`transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'}`}>
                <Card className="w-80 h-[28rem] flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Asisten Ceurdas</CardTitle>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}><X className="h-4 w-4" /></Button>
                    </CardHeader>
                    <CardContent className="flex-1 p-0">
                         <ScrollArea className="h-full p-6" ref={scrollAreaRef}>
                            <div className="space-y-4">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                                        {msg.sender === 'ai' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">C</div>}
                                        <div className={`max-w-[80%] rounded-lg px-3 py-2 ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                            <p className="text-sm">{msg.text}</p>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex items-end gap-2">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">C</div>
                                        <div className="max-w-[80%] rounded-lg px-3 py-2 bg-muted flex items-center">
                                            <LoaderCircle className="h-5 w-5 animate-spin"/>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                    <CardFooter>
                        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                            <Input id="message" placeholder="Tanya tentang SKU..." value={input} onChange={e => setInput(e.target.value)} autoComplete="off" />
                            <Button type="submit" size="icon" disabled={isLoading}><Send className="h-4 w-4" /></Button>
                        </form>
                    </CardFooter>
                </Card>
            </div>
            {/* Floating Button Toggle */}
            <div className="text-right mt-2">
                <Button onClick={() => setIsOpen(!isOpen)} className="rounded-full w-16 h-16 shadow-lg">
                    <MessageSquare className="h-8 w-8"/>
                </Button>
            </div>
        </div>
    );
}