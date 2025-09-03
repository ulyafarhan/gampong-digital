import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/Components/ui/alert-dialog';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

export default function Index({ auth, aparats, flash = {} }) {
    return (
        <AuthenticatedLayout user={auth.user} header="Struktur Pemerintahan">
            <Head title="Struktur Pemerintahan" />

            {flash.message && <div className="bg-green-100 border-green-400 text-green-700 px-4 py-3 rounded mb-4">{flash.message}</div>}

            <div className="flex justify-end mb-4">
                <Button asChild>
                    <Link href={route('admin.aparat.create')}><PlusCircle className="mr-2 h-4 w-4" /> Tambah Aparat</Link>
                </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {aparats.map(item => (
                    <Card key={item.id} className="text-center flex flex-col">
                        <CardContent className="pt-6 flex-1">
                            <img 
                                src={item.foto ? `/storage/${item.foto}` : 'https://placehold.co/150x150'} 
                                alt={item.nama} 
                                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full mx-auto shadow-lg border-4 border-white dark:border-gray-800" 
                            />
                            <h3 className="mt-4 font-bold text-lg">{item.nama}</h3>
                            <p className="text-sm text-muted-foreground">{item.jabatan}</p>
                        </CardContent>
                        <CardFooter className="flex justify-center space-x-2">
                             <Button variant="outline" size="icon" asChild>
                                <Link href={route('admin.aparat.edit', item.id)}><Edit className="h-4 w-4"/></Link>
                            </Button>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4"/></Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Anda Yakin?</AlertDialogTitle>
                                        <AlertDialogDescription>Tindakan ini akan menghapus data aparat "{item.nama}" secara permanen.</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                        <AlertDialogAction asChild>
                                            <Link href={route('admin.aparat.destroy', item.id)} method="delete" as="button">Hapus</Link>
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