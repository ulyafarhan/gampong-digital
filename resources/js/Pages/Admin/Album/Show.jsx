import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/Components/ui/alert-dialog';
import InputError from '@/Components/InputError';
import { Trash2, Edit } from 'lucide-react';

export default function Show({ auth, album, flash = {} }) {
    const { setData, post, processing, errors, progress, reset } = useForm({
        fotos: [],
    });

    function handleUpload(e) {
        e.preventDefault();
        post(route('admin.album.fotos.store', album.id), {
            onSuccess: () => reset('fotos'), // Reset input file setelah berhasil
        });
    }

    return (
        <AuthenticatedLayout user={auth.user} header={`Album: ${album.judul}`}>
            <Head title={album.judul} />
            
            <div className="flex justify-between items-center mb-4">
                <p className="text-muted-foreground">{album.deskripsi}</p>
                <Button variant="outline" size="sm" asChild>
                    <Link href={route('admin.album.edit', album.id)}><Edit className="mr-2 h-4 w-4"/> Edit Detail Album</Link>
                </Button>
            </div>

            {flash.message && <div className="bg-green-100 border-green-400 text-green-700 px-4 py-3 rounded mb-4">{flash.message}</div>}

            <Card>
                <CardHeader>
                    <CardTitle>Unggah Foto</CardTitle>
                    <CardDescription>Anda bisa memilih lebih dari satu foto untuk diunggah sekaligus.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleUpload}>
                        <Label htmlFor="fotos">Pilih File Foto</Label>
                        <Input id="fotos" type="file" multiple onChange={e => setData('fotos', e.target.files)} className="mt-2" />
                        <InputError message={errors.fotos} className="mt-2"/>
                        {progress && <progress value={progress.percentage} max="100" className="w-full mt-2">{progress.percentage}%</progress>}
                        <Button type="submit" disabled={processing} className="mt-4">Unggah Foto</Button>
                    </form>
                </CardContent>
            </Card>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {album.fotos.map(foto => (
                    <div key={foto.id} className="relative group">
                        <img src={`/storage/${foto.path}`} className="aspect-square w-full object-cover rounded-lg"/>
                        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                             <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="icon">
                                        <Trash2 className="h-4 w-4"/>
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Hapus Foto Ini?</AlertDialogTitle>
                                        <AlertDialogDescription>Tindakan ini tidak bisa dibatalkan.</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                        <AlertDialogAction asChild><Link href={route('admin.fotos.destroy', foto.id)} method="delete" as="button">Hapus</Link></AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}