import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';

// Komponen Paginasi
const Pagination = ({ links }) => (
    <nav className="mt-8 flex justify-center space-x-1">
        {links.map((link, index) => {
            // Jika link tidak punya URL (misal: "...") atau null (misal: "Previous" di halaman 1),
            // render sebagai span yang tidak bisa diklik.
            if (!link.url) {
                return (
                    <div
                        key={index}
                        className="px-4 py-2 border rounded-md text-sm text-gray-400 cursor-not-allowed"
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                );
            }

            // Jika link punya URL, render sebagai Inertia Link
            return (
                <Link
                    key={index}
                    href={link.url}
                    className={`px-4 py-2 border rounded-md text-sm ${
                        link.active ? 'bg-green-800 text-white border-green-800' : 'bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'
                    }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            );
        })}
    </nav>
);

// Fungsi helper untuk format tanggal
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
};

export default function BeritaIndex({ beritas }) {
    return (
        <PublicLayout title="Berita Gampong">
            <main className="py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-['Merriweather'] font-bold text-green-900 dark:text-white">
                            Berita & Pengumuman
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            Ikuti informasi dan kegiatan terbaru dari Gampong Udeung.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {beritas.data.map((berita) => (
                            <Card key={berita.id} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow">
                                <Link href={route('berita.show', berita.slug)}>
                                    <img 
                                        src={berita.gambar ? `/storage/${berita.gambar}` : 'https://placehold.co/600x400'} 
                                        alt={berita.judul} 
                                        className="w-full h-48 object-cover"
                                    />
                                </Link>
                                <div className="p-6 flex-1 flex flex-col">
                                    <p className="text-sm text-gray-500">{formatDate(berita.created_at)}</p>
                                    <h2 className="mt-2 font-['Merriweather'] text-xl font-semibold flex-1">
                                        <Link href={route('berita.show', berita.slug)} className="hover:text-green-700 transition-colors">
                                            {berita.judul}
                                        </Link>
                                    </h2>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        {berita.ringkasan ? berita.ringkasan.substring(0, 100) + '...' : berita.isi.substring(0, 100) + '...'}
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <Pagination links={beritas.links} />
                </div>
            </main>
        </PublicLayout>
    );
}