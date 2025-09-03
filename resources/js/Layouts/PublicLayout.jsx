import { Link, Head, usePage } from '@inertiajs/react';
import CeurdasChat from '@/Components/CeurdasChat';
import { useState, useEffect } from 'react';
import { Button } from '@/Components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/Components/ui/sheet'; // <-- Impor Sheet
import { Menu } from 'lucide-react'; // <-- Impor ikon Menu

// Komponen NavLink Kustom untuk konsistensi
const NavLink = ({ href, children, className = '' }) => (
    <Link 
        href={href} 
        className={`transition-colors ${className}`}
    >
        {children}
    </Link>
);

export default function PublicLayout({ children, title }) {
    const { url } = usePage();
    const isHomepage = url === '/';

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 567);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const headerClass = isHomepage && !scrolled
        ? 'bg-transparent text-white'
        : 'bg-white/80 dark:bg-black/80 backdrop-blur-sm shadow-sm text-gray-800 dark:text-gray-200';
    
    const linkClass = isHomepage && !scrolled
        ? 'text-gray-200 hover:text-white'
        : 'text-gray-600 hover:text-green-800 dark:text-gray-300 dark:hover:text-white';

    const brandClass = isHomepage && !scrolled
        ? 'text-white'
        : 'text-green-800 dark:text-green-400';

    return (
        <>
            <Head title={title ? `${title} - Gampong Udeung` : 'Platform Digital Gampong Udeung'} />
            <div className="min-h-screen bg-gray-100 dark:bg-black font-['Inter']">
                
                <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${headerClass}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <Link href={route('home')} className={`font-['Merriweather'] font-bold text-lg transition-colors ${brandClass}`}>
                                Gampong Udeung
                            </Link>
                            
                            {/* Navigasi Desktop (Disembunyikan di layar kecil) */}
                            <nav className="hidden md:flex space-x-6">
                               <NavLink href={route('home')} className={`text-sm font-semibold ${linkClass}`}>Beranda</NavLink>
                               <NavLink href={route('berita.index')} className={`text-sm font-semibold ${linkClass}`}>Berita</NavLink>
                               <NavLink href={route('panduan.index')} className={`text-sm font-semibold ${linkClass}`}>Panduan</NavLink>
                               <NavLink href={route('kegiatan.index')} className={`text-sm font-semibold ${linkClass}`}>Kegiatan</NavLink>
                               <NavLink href={route('galeri.index')} className={`text-sm font-semibold ${linkClass}`}>Galeri</NavLink>
                               <NavLink href={route('profil.gampong')} className={`text-sm font-semibold ${linkClass}`}>Profil</NavLink>
                            </nav>

                            {/* Tombol Hamburger Menu (Hanya tampil di layar kecil) */}
                            <div className="md:hidden">
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <Menu className={`h-6 w-6 transition-colors ${brandClass}`} />
                                            <span className="sr-only">Buka menu</span>
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="left">
                                        <div className="p-4">
                                            <Link href={route('home')} className="font-['Merriweather'] font-bold text-lg text-green-800 dark:text-green-400 mb-8 block">
                                                Gampong Udeung
                                            </Link>
                                            <nav className="grid gap-4">
                                                <SheetClose asChild><NavLink href={route('home')} className="text-lg font-semibold text-gray-800 dark:text-gray-200">Beranda</NavLink></SheetClose>
                                                <SheetClose asChild><NavLink href={route('berita.index')} className="text-lg font-semibold text-gray-800 dark:text-gray-200">Berita</NavLink></SheetClose>
                                                <SheetClose asChild><NavLink href={route('panduan.index')} className="text-lg font-semibold text-gray-800 dark:text-gray-200">Panduan</NavLink></SheetClose>
                                                <SheetClose asChild><NavLink href={route('kegiatan.index')} className="text-lg font-semibold text-gray-800 dark:text-gray-200">Kegiatan</NavLink></SheetClose>
                                                <SheetClose asChild><NavLink href={route('galeri.index')} className="text-lg font-semibold text-gray-800 dark:text-gray-200">Galeri</NavLink></SheetClose>
                                                <SheetClose asChild><NavLink href={route('profil.gampong')} className="text-lg font-semibold text-gray-800 dark:text-gray-200">Profil Gampong</NavLink></SheetClose>
                                            </nav>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                    </div>
                </header>

                <main className={isHomepage ? '' : 'pt-16'}>
                    {children}
                </main>

                <footer className="py-8 bg-green-900 dark:bg-black text-green-200 border-t border-green-800">
                    <div className="max-w-7xl mx-auto text-center">
                        <p>© {new Date().getFullYear()} Pemerintah Gampong Udeung.</p>
                        <p className="text-xs text-green-400 mt-1">Platform Digital Gampong Udeung</p>
                    </div>
                </footer>

                <CeurdasChat />
            </div>
        </>
    );
}