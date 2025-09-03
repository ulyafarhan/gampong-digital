import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter } from '@/Components/ui/card';
import { PlusCircle } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/Components/ui/alert-dialog';

export default function Index({ auth, albums, flash = {} }) {
    return (
        <AuthenticatedLayout user={auth.user} header="Galeri Dokumentasi">
            <Head title="Galeri" />

            {flash.message && <div className="bg-green-100 border-green-400 text-green-700 px-4 py-3 rounded mb-4">{flash.message}</div>}

            <div className="flex justify-end mb-4">
                <Button asChild>
                    <Link href={route('admin.album.create')}><PlusCircle className="mr-2 h-4 w-4" /> Buat Album Baru</Link>
                </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {albums.map(album => (
                    // KUNCI #1: Mengubah Card menjadi kontainer flex vertikal
                    <Card key={album.id} className="flex flex-col overflow-hidden">
                        
                        {/* Bagian Gambar */}
                        <CardContent className="p-0">
                            <Link href={route('admin.album.show', album.id)}>
                                <img 
                                    src={album.fotos.length > 0 ? `/storage/${album.fotos[0].path}` : 'https://placehold.co/300x300'} 
                                    alt={album.judul} 
                                    className="aspect-square w-full object-cover hover:scale-105 transition-transform"
                                />
                            </Link>
                        </CardContent>

                        {/* KUNCI #2: Wrapper untuk Judul & Deskripsi yang bisa meregang */}
                        <div className="p-4 flex-1">
                            <h3 className="font-semibold truncate">{album.judul}</h3>
                            <p className="text-xs text-muted-foreground">{album.fotos.length} foto</p>
                        </div>
                        
                        {/* KUNCI #3: Footer yang akan selalu berada di bawah */}
                        <CardFooter className="p-4 pt-0">
                             <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" className="w-full">Hapus</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Hapus Album "{album.judul}"?</AlertDialogTitle>
                                        <AlertDialogDescription>Semua foto di dalam album ini juga akan terhapus secara permanen.</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                        <AlertDialogAction asChild>
                                            <Link href={route('admin.album.destroy', album.id)} method="delete" as="button">Ya, Hapus Album</Link>
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