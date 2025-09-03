import { useState } from 'react';
import { Link } from '@inertiajs/react';

// Shadcn UI Components
import { Button } from '@/Components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/Components/ui/sheet';

// Icons
import HomeIcon from '@/Components/Icons/HomeIcon';
import NewspaperIcon from '@/Components/Icons/NewspaperIcon';
import DocumentTextIcon from '@/Components/Icons/DocumentTextIcon';
import UserCircleIcon from '@/Components/Icons/UserCircleIcon';
import UsersIcon from '@/Components/Icons/UsersIcon';
import CalendarIcon from '@/Components/Icons/CalendarIcon';
import PhotoIcon from '@/Components/Icons/PhotoIcon';
import { PanelLeft, LogOut, ChevronDown } from 'lucide-react'; // Menggunakan ikon dari lucide-react

// Navigasi Link Komponen
const NavLink = ({ href, active, children, icon }) => (
    <Link
        href={href}
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
            active ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50' : ''
        }`}
    >
        {icon}
        {children}
    </Link>
);

// Main Sidebar Content
const SidebarContent = () => (
    <nav className="grid items-start px-4 text-sm font-medium">
        <NavLink href={route('admin.dashboard')} active={route().current('admin.dashboard')} icon={<HomeIcon className="h-4 w-4" />}>Dasbor</NavLink>
        
        <h3 className="my-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Konten</h3>
        <NavLink href={route('admin.berita.index')} active={route().current('admin.berita.*')} icon={<NewspaperIcon className="h-4 w-4" />}>Berita</NavLink>
        <NavLink href={route('admin.panduan.index')} active={route().current('admin.panduan.*')} icon={<DocumentTextIcon className="h-4 w-4" />}>Panduan Admin</NavLink>
        <NavLink href={route('admin.kegiatan.index')} active={route().current('admin.kegiatan.*')} icon={<CalendarIcon className="h-4 w-4" />}>Kalender Kegiatan</NavLink>
        <NavLink href={route('admin.album.index')} active={route().current('admin.album.*')} icon={<PhotoIcon className="h-4 w-4" />}>Galeri</NavLink>
        
        <h3 className="my-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Gampong</h3>
        <NavLink href={route('admin.profil.index')} active={route().current('admin.profil.*')} icon={<UserCircleIcon className="h-4 w-4" />}>Profil Gampong</NavLink>
        <NavLink href={route('admin.aparat.index')} active={route().current('admin.aparat.*')} icon={<UsersIcon className="h-4 w-4" />}>Struktur Gampong</NavLink>
    </nav>
);

export default function Authenticated({ user, header, children }) {
    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            {/* Sidebar for Desktop */}
            <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-[60px] items-center border-b px-6">
                        <Link className="flex items-center gap-2 font-semibold" href={route('admin.dashboard')}>
                            <span className="text-yellow-500">Gampong Udeung</span>
                        </Link>
                    </div>
                    <div className="flex-1 overflow-auto py-2">
                        <SidebarContent />
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col">
                <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
                    {/* Mobile Sidebar Trigger */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
                                <PanelLeft className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                           <div className="flex h-[60px] items-center border-b px-6">
                                <Link className="flex items-center gap-2 font-semibold" href="#">
                                    <span className="text-yellow-500">Gampong Udeung</span>
                                </Link>
                            </div>
                            <div className="mt-4">
                                <SidebarContent />
                            </div>
                        </SheetContent>
                    </Sheet>

                    {/* Header Title */}
                    <div className="w-full flex-1">
                        <h1 className="text-lg font-semibold">{header}</h1>
                    </div>

                    {/* User Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative flex items-center gap-2">
                               {user.name} <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href={route('profile.edit')}>Profil</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                             <DropdownMenuItem asChild>
                                <Link href={route('logout')} method="post" as="button" className="w-full text-left">
                                    Logout
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-gray-50 dark:bg-gray-900">
                    {children}
                </main>
            </div>
        </div>
    );
}