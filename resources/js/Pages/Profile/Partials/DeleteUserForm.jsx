import { useRef } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/Components/ui/alert-dialog';
import InputError from '@/Components/InputError';

export default function DeleteUserForm() {
    const passwordInput = useRef();

    // KUNCI PERBAIKAN: Gunakan 'delete: destroy' untuk hapus akun
    const { data, setData, delete: destroy, processing, errors, reset } = useForm({
        password: '',
    });

    const deleteUser = (e) => {
        e.preventDefault();
        // Panggil method 'destroy'
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Hapus Akun</CardTitle>
                <CardDescription>Setelah akun Anda dihapus, semua datanya akan dihapus secara permanen. Harap unduh data apa pun yang ingin Anda simpan.</CardDescription>
            </CardHeader>
            <CardContent>
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">Hapus Akun</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <form onSubmit={deleteUser}>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Apakah Anda yakin ingin menghapus akun Anda?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Masukkan password Anda untuk mengonfirmasi penghapusan akun secara permanen.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className="my-6 space-y-2">
                                <Label htmlFor="password" className="sr-only">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Password"
                                />
                                <InputError message={errors.password} />
                            </div>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction type="submit" disabled={processing} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                    Hapus Akun
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </form>
                    </AlertDialogContent>
                </AlertDialog>
            </CardContent>
        </Card>
    );
}