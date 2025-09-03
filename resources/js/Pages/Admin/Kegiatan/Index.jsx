import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/Components/ui/alert-dialog';
import { PlusCircle } from 'lucide-react';

// Fungsi helper untuk format tanggal
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
};

export default function Index({ auth, kegiatans, flash = {} }) {
    return (
        <AuthenticatedLayout user={auth.user} header="Manajemen Kegiatan">
            <Head title="Manajemen Kegiatan" />

            {flash.message && (
                <div className="bg-green-100 border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {flash.message}
                </div>
            )}

            <div className="flex justify-end mb-4">
                <Button asChild>
                    <Link href={route('admin.kegiatan.create')}><PlusCircle className="mr-2 h-4 w-4" /> Tambah Kegiatan</Link>
                </Button>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Daftar Kegiatan</CardTitle>
                    <CardDescription>Jadwal kegiatan sosial dan keagamaan di gampong.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama Kegiatan</TableHead>
                                <TableHead>Mulai</TableHead>
                                <TableHead>Selesai</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {kegiatans.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.nama_kegiatan}</TableCell>
                                    <TableCell>{formatDate(item.tanggal_mulai)}</TableCell>
                                    <TableCell>{formatDate(item.tanggal_selesai)}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={route('admin.kegiatan.edit', item.id)}>Edit</Link>
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive" size="sm">Hapus</Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Anda Yakin?</AlertDialogTitle>
                                                    <AlertDialogDescription>Tindakan ini akan menghapus kegiatan "{item.nama_kegiatan}" secara permanen.</AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                                    <AlertDialogAction asChild>
                                                        <Link href={route('admin.kegiatan.destroy', item.id)} method="delete" as="button">Hapus</Link>
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}