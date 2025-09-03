import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Link } from '@inertiajs/react';

const formatDate = (dateString, options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('id-ID', options);
};

const KegiatanCard = ({ kegiatan }) => (
    <Card>
        <CardHeader>
            <CardTitle>{kegiatan.nama_kegiatan}</CardTitle>
            <CardDescription>{kegiatan.lokasi}</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="font-semibold">{formatDate(kegiatan.tanggal_mulai)}</p>
            {kegiatan.deskripsi && <p className="mt-2 text-sm text-muted-foreground">{kegiatan.deskripsi}</p>}
        </CardContent>
    </Card>
);

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

export default function KegiatanIndex({ kegiatanAkanDatang, kegiatanTelahLewat }) {
    return (
        <PublicLayout title="Jadwal Kegiatan">
            <main className="py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-['Merriweather'] font-bold text-green-900 dark:text-white">
                            Jadwal Kegiatan Gampong
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            Informasi jadwal kegiatan sosial dan keagamaan di Gampong Udeung.
                        </p>
                    </div>

                    {/* Kegiatan Akan Datang */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-['Merriweather'] font-bold mb-6">Akan Datang</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {kegiatanAkanDatang.length > 0 ? (
                                kegiatanAkanDatang.map(kegiatan => <KegiatanCard key={kegiatan.id} kegiatan={kegiatan} />)
                            ) : (
                                <p className="text-muted-foreground md:col-span-3">Tidak ada kegiatan yang dijadwalkan.</p>
                            )}
                        </div>
                    </div>

                     {/* Kegiatan Telah Lewat */}
                    <div>
                        <h2 className="text-2xl font-['Merriweather'] font-bold mb-6">Telah Berakhir</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {kegiatanTelahLewat.data.map(kegiatan => <KegiatanCard key={kegiatan.id} kegiatan={kegiatan} />)}
                        </div>
                        <Pagination links={kegiatanTelahLewat.links} />
                    </div>
                </div>
            </main>
        </PublicLayout>
    );
}