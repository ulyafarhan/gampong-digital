import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/Components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/Components/ui/alert-dialog';
import { PlusCircle } from 'lucide-react';

export default function Index({ auth, beritas, flash = {} }) {
    return (
        <AuthenticatedLayout user={auth.user} header="Manajemen Berita">
            <Head title="Manajemen Berita" />

            {flash && flash.message && <div className="bg-green-100 border-green-400 text-green-700 px-4 py-3 rounded mb-4">{flash.message}</div>}

            <div className="flex justify-end mb-4">
                <Button asChild>
                    <Link href={route('admin.berita.create')}><PlusCircle className="mr-2 h-4 w-4" /> Tambah Berita</Link>
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {beritas.map((berita) => (
                    <Card key={berita.id} className="flex flex-col">
                        <CardHeader className="flex-1">
                            <CardTitle>{berita.judul}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1">
                             {berita.gambar && <img src={`/storage/${berita.gambar}`} alt={berita.judul} className="w-full h-40 object-cover rounded-md mb-4"/>}
                            {/* KEMBALIKAN KE VERSI POTONGAN ISI BERITA */}
                            <p className="text-sm text-muted-foreground">
                                {berita.isi.substring(0, 150)}...
                            </p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" asChild>
                                <Link href={route('admin.berita.edit', berita.id)}>Edit</Link>
                            </Button>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive">Hapus</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Apakah Anda benar-benar yakin?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Tindakan ini tidak bisa dibatalkan. Ini akan menghapus berita "{berita.judul}" secara permanen.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                        <AlertDialogAction asChild>
                                            <Link href={route('admin.berita.destroy', berita.id)} method="delete" as="button">Hapus</Link>
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}