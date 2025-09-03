import { useRef } from 'react';
import { useForm } from '@inertiajs/react';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import InputError from '@/Components/InputError';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Alert, AlertDescription } from '@/Components/ui/alert';

export default function UpdatePasswordForm() {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    // KUNCI PERBAIKAN: Gunakan 'put' untuk update password
    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();
        // Panggil method 'put'
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }
                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Perbarui Password</CardTitle>
                <CardDescription>Pastikan akun Anda menggunakan password yang panjang dan acak agar tetap aman.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={updatePassword} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="current_password">Password Saat Ini</Label>
                        <Input
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            type="password"
                            autoComplete="current-password"
                        />
                        <InputError message={errors.current_password} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password Baru</Label>
                        <Input
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type="password"
                            autoComplete="new-password"
                        />
                        <InputError message={errors.password} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                        <Input
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            type="password"
                            autoComplete="new-password"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>
                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Simpan</Button>
                         {recentlySuccessful && (
                           <Alert variant="success" className="border-green-500 text-green-700">
                                <AlertDescription>Tersimpan.</AlertDescription>
                            </Alert>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}