import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import InputError from '@/Components/InputError';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
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
        post(route('register'));
    };

    return (
        <>
            <Head title="Register" />
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
                                <CardTitle className="text-2xl">Buat Akun Baru</CardTitle>
                                <CardDescription>
                                    Masukkan detail Anda untuk mendaftar sebagai admin.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={submit}>
                                    <div className="grid gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Nama</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={data.name}
                                                autoComplete="name"
                                                autoFocus
                                                onChange={(e) => setData('name', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.name} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                autoComplete="username"
                                                onChange={(e) => setData('email', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.email} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="password">Password</Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                autoComplete="new-password"
                                                onChange={(e) => setData('password', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.password} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                                            <Input
                                                id="password_confirmation"
                                                type="password"
                                                name="password_confirmation"
                                                value={data.password_confirmation}
                                                autoComplete="new-password"
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.password_confirmation} />
                                        </div>
                                        <Button type="submit" className="w-full" disabled={processing}>
                                            Register
                                        </Button>
                                    </div>
                                </form>
                                <div className="mt-4 text-center text-sm">
                                    Sudah punya akun?{' '}
                                    <Link href={route('login')} className="underline">
                                        Login
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