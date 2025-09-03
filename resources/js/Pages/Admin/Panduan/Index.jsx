import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/Components/ui/alert-dialog';
import { PlusCircle } from 'lucide-react';

export default function Index({ auth, panduans, flash = {} }) {
    return (
        <AuthenticatedLayout user={auth.user} header="Manajemen Panduan Administrasi">
            <Head title="Manajemen Panduan" />

            {flash.message && <div className="bg-green-100 border-green-400 text-green-700 px-4 py-3 rounded mb-4">{flash.message}</div>}
            
            <div className="flex justify-end mb-4">
                <Button asChild>
                    <Link href={route('admin.panduan.create')}><PlusCircle className="mr-2 h-4 w-4" /> Tambah Panduan</Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Daftar Panduan</CardTitle>
                    <CardDescription>Semua panduan administrasi yang tersedia untuk warga.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Judul</TableHead>
                                <TableHead>Estimasi Waktu</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {panduans.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.judul}</TableCell>
                                    <TableCell>{item.estimasi_waktu}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={route('admin.panduan.edit', item.id)}>Edit</Link>
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive" size="sm">Hapus</Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Anda Yakin?</AlertDialogTitle>
                                                    <AlertDialogDescription>Tindakan ini akan menghapus panduan "{item.judul}" secara permanen.</AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                                    <AlertDialogAction asChild><Link href={route('admin.panduan.destroy', item.id)} method="delete" as="button">Hapus</Link></AlertDialogAction>
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