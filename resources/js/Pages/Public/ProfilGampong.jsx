import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/Components/ui/card';

export default function ProfilGampong({ settings, aparats }) {
    // Memproses misi yang dipisahkan baris baru menjadi array
    const misiList = settings.misi ? settings.misi.split('\n').filter(item => item.trim() !== '') : [];

    return (
        <PublicLayout title="Profil Gampong">
            <main className="py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-['Merriweather'] font-bold text-green-900 dark:text-white">
                            Tentang Gampong Udeung
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            Mengenal lebih dekat sejarah, visi, misi, dan struktur pemerintahan gampong.
                        </p>
                    </div>

                    {/* Sejarah Singkat */}
                    {settings.sejarah && (
                        <section className="mb-16">
                            <h2 className="text-3xl font-['Merriweather'] font-bold mb-6 text-center">Sejarah Singkat</h2>
                            <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto text-justify">
                                <p>{settings.sejarah}</p>
                            </div>
                        </section>
                    )}

                    {/* Visi & Misi */}
                    <section className="mb-16 bg-white dark:bg-gray-900 p-8 md:p-12 rounded-lg shadow-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-2xl font-['Merriweather'] font-bold text-green-800 dark:text-green-400">Visi</h3>
                                <p className="mt-4 text-lg italic text-muted-foreground">{settings.visi}</p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-['Merriweather'] font-bold text-green-800 dark:text-green-400">Misi</h3>
                                <ul className="mt-4 space-y-2 list-disc list-inside">
                                    {misiList.map((misi, index) => (
                                        <li key={index}>{misi}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Struktur Pemerintahan */}
                    <section>
                        <h2 className="text-3xl font-['Merriweather'] font-bold mb-8 text-center">Struktur Pemerintahan Gampong</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                            {aparats.map(item => (
                                <Card key={item.id} className="text-center border-0 shadow-none bg-transparent">
                                    <CardContent className="pt-6">
                                        <img 
                                            src={item.foto ? `/storage/${item.foto}` : 'https://placehold.co/150x150'} 
                                            alt={item.nama} 
                                            className="w-32 h-32 object-cover rounded-full mx-auto shadow-lg border-4 border-white dark:border-gray-800" 
                                        />
                                        <h3 className="mt-4 font-bold text-lg">{item.nama}</h3>
                                        <p className="text-sm text-yellow-600 dark:text-yellow-400 font-semibold">{item.jabatan}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </PublicLayout>
    );
}