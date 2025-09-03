import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/Components/ui/card';

export default function GaleriIndex({ albums }) {
    return (
        <PublicLayout title="Galeri">
            <main className="py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-['Merriweather'] font-bold text-green-900 dark:text-white">
                            Galeri Dokumentasi
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            Momen-momen penting yang terekam di Gampong Udeung.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {albums.map(album => (
                            <Card key={album.id} className="overflow-hidden group">
                                <Link href={route('galeri.show', album.id)}>
                                    <div className="overflow-hidden">
                                        <img 
                                            src={album.fotos.length > 0 ? `/storage/${album.fotos[0].path}` : 'https://placehold.co/600x400'} 
                                            alt={album.judul} 
                                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-6 bg-white dark:bg-gray-900">
                                        <h2 className="font-['Merriweather'] text-xl font-semibold group-hover:text-green-700 transition-colors">
                                            {album.judul}
                                        </h2>
                                        <p className="mt-2 text-sm text-muted-foreground">{album.fotos.length} foto</p>
                                    </div>
                                </Link>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
        </PublicLayout>
    );
}