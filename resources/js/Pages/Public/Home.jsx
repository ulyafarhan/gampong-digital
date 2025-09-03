import PublicLayout from '@/Layouts/PublicLayout'; // <-- Impor layout baru
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/Components/ui/card';
import { Newspaper, BookOpen, Calendar, ArrowRight, Camera } from 'lucide-react';

// Fungsi helper untuk format tanggal
const formatDate = (dateString, options = { year: 'numeric', month: 'long', day: 'numeric' }) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('id-ID', options);
};

export default function Home({ beritas, panduans, kegiatans, albumTerbaru }) {
    const heroStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/hero-background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        // Bungkus semua konten dengan PublicLayout
        <PublicLayout title="Beranda"> 
            
            {/* Hero Jumbotron Section */}
            <section style={heroStyle} className="relative text-white py-32 sm:py-40 lg:py-56 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-2xl text-left"> {/* KUNCI 1: Rata Kiri */}
                        <h1 className="text-4xl md:text-6xl font-['Merriweather'] font-bold tracking-tight text-shadow-lg">
                            Selamat Datang di <br/>
                            <span className="text-yellow-400">Gampong Udeung</span> {/* KUNCI 2: Dua Warna */}
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-200 text-shadow">
                            Unggul dalam transparansi, efisiensi pelayanan, dan pemberdayaan masyarakat melalui teknologi digital masa depan.
                        </p>
                        <div className="mt-10">
                            {/* KUNCI 3: Tombol Transparan dengan Efek Hover */}
                            <a href="#panduan-warga" 
                            className="inline-flex items-center justify-center px-8 py-3 
                                        border-2 border-yellow-400 text-yellow-400 font-semibold 
                                        rounded-full shadow-md 
                                        bg-transparent 
                                        transition-all duration-300 ease-in-out
                                        hover:bg-yellow-400 hover:text-green-900 hover:shadow-lg
                                        focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-black/50">
                                Mulai Jelajahi
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Panduan Layanan */}
            <section id="panduan-warga" className="py-16 sm:py-20 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-['Merriweather'] font-bold text-green-900 dark:text-white">Panduan Layanan Administrasi</h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Solusi "satu pintu" untuk semua kebutuhan birokrasi Anda.</p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {panduans.map(panduan => (
                            <Link href={route('panduan.index')} key={panduan.id}>
                                <Card className="text-center h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                                    <CardHeader>
                                        <BookOpen className="mx-auto h-12 w-12 text-green-700 dark:text-green-400"/>
                                        <CardTitle className="mt-4  font-semibold">{panduan.judul}</CardTitle>
                                    </CardHeader>
                                </Card>
                            </Link>
                        ))}
                    </div>
                    <div className="mt-8 text-center">
                        <Button asChild variant="outline">
                            <Link href={route('panduan.index')}>Lihat Semua Panduan <ArrowRight className="ml-2 h-4 w-4 text-green-700"/></Link>
                        </Button>
                    </div>
                </div>
            </section>
            
            {/* Berita & Kegiatan */}
            <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-['Merriweather'] font-bold text-green-900 dark:text-white mb-8">Berita Terkini</h2>
                        <div className="space-y-8">
                            {beritas.map(berita => (
                                <div key={berita.id} className="flex gap-4 items-start">
                                    {berita.gambar && <img src={`/storage/${berita.gambar}`} className="w-24 h-24 object-cover rounded-lg hidden sm:block"/>}
                                    <div>
                                        <p className="text-sm text-gray-500">{formatDate(berita.created_at)}</p>
                                        <h3 className="font-bold text-lg hover:text-green-700 transition-colors"><Link href={route('berita.show', berita.slug)}>{berita.judul}</Link></h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{berita.ringkasan ? berita.ringkasan.substring(0, 120) + '...' : berita.isi.substring(0, 120) + '...'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-['Merriweather'] font-bold text-green-900 dark:text-white mb-8">Jadwal Kegiatan</h2>
                        <div className="space-y-4">
                            {kegiatans.length > 0 ? kegiatans.map(kegiatan => (
                                <Card key={kegiatan.id}>
                                    <CardContent className="pt-6">
                                        <p className="text-sm font-bold text-green-700 dark:text-green-400">{formatDate(kegiatan.tanggal_mulai, {weekday: 'long', day: 'numeric', month: 'long'})}</p>
                                        <p className="font-semibold">{kegiatan.nama_kegiatan}</p>
                                        <p className="text-sm text-muted-foreground">{formatDate(kegiatan.tanggal_mulai, {hour: '2-digit', minute: '2-digit'})} WIB di {kegiatan.lokasi}</p>
                                    </CardContent>
                                </Card>
                            )) : <p className="text-muted-foreground">Tidak ada jadwal kegiatan.</p>}
                        </div>
                    </div>
                </div>
            </section>

            {/* Galeri Terbaru */}
            {albumTerbaru && (
                 <section className="py-16 sm:py-20 bg-white dark:bg-gray-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-['Merriweather'] font-bold text-green-900 dark:text-white">Galeri Terbaru</h2>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Momen-momen penting yang terekam di Gampong Udeung.</p>
                        </div>
                        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                            {albumTerbaru.fotos.slice(0, 4).map(foto => (
                                <div key={foto.id} className="overflow-hidden rounded-lg">
                                    <Link href={route('galeri.show', albumTerbaru.id)}>
                                        <img src={`/storage/${foto.path}`} alt={foto.caption || albumTerbaru.judul} className="h-full w-full object-cover aspect-square hover:scale-105 transition-transform"/>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 text-center">
                            <Button asChild variant="outline">
                                <Link href={route('galeri.index')}>Lihat Semua Galeri <ArrowRight className="ml-2 h-4 w-4"/></Link>
                            </Button>
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}