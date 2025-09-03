import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import InputError from '@/Components/InputError';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
            <Head title="Forgot Password" />
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
                                <CardTitle className="text-2xl">Lupa Password?</CardTitle>
                                <CardDescription>
                                    Tidak masalah. Masukkan alamat email Anda dan kami akan mengirimkan link untuk mereset password Anda.
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
                                                autoFocus
                                                onChange={(e) => setData('email', e.target.value)}
                                            />
                                            <InputError message={errors.email} />
                                        </div>
                                        <Button type="submit" className="w-full" disabled={processing}>
                                            Kirim Link Reset Password
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