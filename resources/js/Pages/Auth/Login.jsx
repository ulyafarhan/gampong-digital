import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Checkbox } from '@/Components/ui/checkbox';
import InputError from '@/Components/InputError';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <>
            <Head title="Log in" />
            <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
                {/* Kolom Kiri - Branding */}
                <div className="hidden bg-green-800 lg:flex lg:flex-col items-center justify-center p-8 text-center">
                    <div className="text-white">
                        <h1 className="font-['Merriweather'] text-4xl font-bold text-yellow-400">
                            Platform Digital Gampong Udeung
                        </h1>
                        <p className="mt-4 text-lg text-green-200">
                            Transparansi, Efisiensi Pelayanan, dan Pemberdayaan Masyarakat Melalui Teknologi.
                        </p>
                    </div>
                </div>

                {/* Kolom Kanan - Form */}
                <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
                    <div className="mx-auto w-[380px]">
                        <Card>
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl">Selamat Datang Kembali</CardTitle>
                                <CardDescription>
                                    Masukkan email dan password Anda untuk masuk ke panel admin.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
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
                                                autoFocus
                                                onChange={(e) => setData('email', e.target.value)}
                                            />
                                            <InputError message={errors.email} />
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="flex items-center">
                                                <Label htmlFor="password">Password</Label>
                                                {canResetPassword && (
                                                    <Link
                                                        href={route('password.request')}
                                                        className="ml-auto inline-block text-sm underline"
                                                    >
                                                        Lupa password?
                                                    </Link>
                                                )}
                                            </div>
                                            <Input
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                autoComplete="current-password"
                                                onChange={(e) => setData('password', e.target.value)}
                                            />
                                            <InputError message={errors.password} />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="remember"
                                                name="remember"
                                                checked={data.remember}
                                                onCheckedChange={(checked) => setData('remember', checked)}
                                            />
                                            <Label htmlFor="remember" className="text-sm font-normal">
                                                Ingat saya
                                            </Label>
                                        </div>
                                        <Button type="submit" className="w-full" disabled={processing}>
                                            Log in
                                        </Button>
                                    </div>
                                </form>
                                <div className="mt-4 text-center text-sm">
                                    Belum punya akun?{' '}
                                    <Link href={route('register')} className="underline">
                                        Register
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}