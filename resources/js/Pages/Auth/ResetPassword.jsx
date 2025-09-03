import { useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import InputError from '@/Components/InputError';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'));
    };

    return (
         <>
            <Head title="Reset Password" />
            <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
                <div className="hidden bg-green-800 lg:flex lg:flex-col items-center justify-center p-8 text-center">
                    <div className="text-white">
                        <h1 className="font-['Merriweather'] text-4xl font-bold text-yellow-400">Platform Digital Gampong Udeung</h1>
                        <p className="mt-4 text-lg text-green-200">Transparansi, Efisiensi Pelayanan, dan Pemberdayaan Masyarakat Melalui Teknologi.</p>
                    </div>
                </div>
                <div className="flex items-center justify-center py-12 px-4 min-h-screen">
                    <div className="mx-auto w-[380px]">
                        <Card>
                             <CardHeader className="text-center">
                                <CardTitle className="text-2xl">Reset Password Anda</CardTitle>
                                <CardDescription>
                                    Buat password baru yang kuat untuk mengamankan akun Anda.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={submit}>
                                    <div className="grid gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                autoComplete="username"
                                                onChange={(e) => setData('email', e.target.value)}
                                            />
                                            <InputError message={errors.email} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="password">Password Baru</Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                autoComplete="new-password"
                                                autoFocus
                                                onChange={(e) => setData('password', e.target.value)}
                                            />
                                            <InputError message={errors.password} />
                                        </div>
                                         <div className="grid gap-2">
                                            <Label htmlFor="password_confirmation">Konfirmasi Password Baru</Label>
                                            <Input
                                                type="password"
                                                name="password_confirmation"
                                                value={data.password_confirmation}
                                                autoComplete="new-password"
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                            />
                                            <InputError message={errors.password_confirmation} />
                                        </div>
                                        <Button type="submit" className="w-full" disabled={processing}>
                                            Reset Password
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}