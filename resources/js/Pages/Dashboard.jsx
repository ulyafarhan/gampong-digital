// File: resources/js/Pages/Dashboard.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Newspaper, BookOpen, Calendar, Users, Camera, ArrowRight } from 'lucide-react';

// Fungsi helper untuk format tanggal
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
};

export default function Dashboard({ auth, stats, beritaTerbaru, kegiatanTerdekat }) {
    const statItems = [
        { title: 'Berita', count: stats.berita, icon: <Newspaper className="h-4 w-4 text-muted-foreground" />, href: route('admin.berita.index') },
        { title: 'Panduan', count: stats.panduan, icon: <BookOpen className="h-4 w-4 text-muted-foreground" />, href: route('admin.panduan.index') },
        { title: 'Kegiatan', count: stats.kegiatan, icon: <Calendar className="h-4 w-4 text-muted-foreground" />, href: route('admin.kegiatan.index') },
        { title: 'Album Galeri', count: stats.album, icon: <Camera className="h-4 w-4 text-muted-foreground" />, href: route('admin.album.index') },
        { title: 'Aparat Desa', count: stats.aparat, icon: <Users className="h-4 w-4 text-muted-foreground" />, href: route('admin.aparat.index') },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Dasbor"
        >
            <Head title="Dasbor" />

            {/* Kartu Statistik */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {statItems.map((item, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                            {item.icon}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{item.count}</div>
                             <Link href={item.href} className="text-xs text-muted-foreground hover:underline">
                                Lihat Semua
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Informasi Terbaru & Aksi Cepat */}
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Aktivitas Terbaru</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {beritaTerbaru ? (
                            <div className="flex items-center">
                                <Newspaper className="h-5 w-5 mr-4 text-muted-foreground" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium leading-none">Berita Terakhir Dipublikasi</p>
                                    <p className="text-sm text-muted-foreground truncate">{beritaTerbaru.judul}</p>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={route('admin.berita.edit', beritaTerbaru.id)}>Lihat</Link>
                                </Button>
                            </div>
                        ) : <p className="text-sm text-muted-foreground">Belum ada berita.</p>}

                        {kegiatanTerdekat ? (
                             <div className="flex items-center">
                                <Calendar className="h-5 w-5 mr-4 text-muted-foreground" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium leading-none">Kegiatan Terdekat</p>
                                    <p className="text-sm text-muted-foreground truncate">{kegiatanTerdekat.nama_kegiatan} ({formatDate(kegiatanTerdekat.tanggal_mulai)})</p>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={route('admin.kegiatan.edit', kegiatanTerdekat.id)}>Lihat</Link>
                                </Button>
                            </div>
                        ) : <p className="text-sm text-muted-foreground">Tidak ada kegiatan mendatang.</p>}
                    </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                     <CardHeader>
                        <CardTitle>Aksi Cepat</CardTitle>
                        <CardDescription>Buat konten baru dengan cepat.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-2">
                       <Button asChild className="justify-start">
                           <Link href={route('admin.berita.create')}><ArrowRight className="mr-2 h-4 w-4" /> Tambah Berita Baru</Link>
                       </Button>
                       <Button asChild className="justify-start">
                           <Link href={route('admin.kegiatan.create')}><ArrowRight className="mr-2 h-4 w-4" /> Tambah Kegiatan Baru</Link>
                       </Button>
                       <Button asChild className="justify-start">
                           <Link href={route('admin.panduan.create')}><ArrowRight className="mr-2 h-4 w-4" /> Tambah Panduan Baru</Link>
                       </Button>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}