import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
         <>
            <Head title="Email Verification" />
             <div className="flex items-center justify-center py-12 px-4 min-h-screen bg-gray-100 dark:bg-black">
                <div className="mx-auto w-[420px]">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Verifikasi Alamat Email Anda</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground text-sm">
                                Terima kasih telah mendaftar! Sebelum memulai, bisakah Anda memverifikasi alamat email Anda dengan mengklik link yang baru saja kami kirimkan ke email Anda? Jika Anda tidak menerima email tersebut, kami akan dengan senang hati mengirimkan yang lain.
                            </p>

                            {status === 'verification-link-sent' && (
                                <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
                                    Link verifikasi baru telah dikirim ke alamat email yang Anda berikan saat pendaftaran.
                                </div>
                            )}

                            <form onSubmit={submit}>
                                <div className="mt-4 flex items-center justify-between">
                                    <Button disabled={processing}>Kirim Ulang Email Verifikasi</Button>

                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                    >
                                        Log Out
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}