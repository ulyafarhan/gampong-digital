// File: resources/js/Pages/Public/GaleriShow.jsx
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

export default function GaleriShow({ album }) {
    return (
        <>
            <Head title={`Galeri: ${album.judul}`} />
            <div className="min-h-screen bg-gray-100 dark:bg-black font-['Inter']">
                {/* Header Sederhana */}
                 <header className="bg-white/80 dark:bg-black/80 backdrop-blur-sm sticky top-0 z-40">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <Link href={route('galeri.index')} className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white">
                            <ArrowLeft className="h-4 w-4" />
                            Kembali ke Daftar Album
                        </Link>
                    </div>
                </header>

                <main className="py-8 sm:py-12">
                    {/* Judul Album */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-3xl md:text-5xl font-['Merriweather'] font-bold text-green-900 dark:text-white">
                            {album.judul}
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                            {album.deskripsi}
                        </p>
                    </div>

                    {/* KONTENER HORIZONTAL SCROLL */}
                    <div className="mt-12">
                        <div className="flex overflow-x-auto space-x-4 sm:space-x-8 p-4 sm:p-8 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-green-700 scrollbar-track-green-100">
                            {album.fotos.map((foto) => (
                                <div key={foto.id} className="flex-shrink-0 w-4/5 sm:w-2/3 md:w-1/2 lg:w-1/3 snap-center">
                                    <div className="overflow-hidden rounded-lg shadow-xl">
                                         <img 
                                            src={`/storage/${foto.path}`} 
                                            alt={foto.caption || album.judul} 
                                            className="w-full h-full object-cover aspect-[4/3]"
                                        />
                                    </div>
                                    {foto.caption && <p className="mt-2 text-center text-sm text-gray-500">{foto.caption}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}