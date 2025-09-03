import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import InputError from '@/Components/InputError';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({ judul: '', deskripsi: '' });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('admin.album.store'));
    }

    return (
        <AuthenticatedLayout user={auth.user} header="Buat Album Baru">
            <Head title="Buat Album" />
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Album Baru</CardTitle>
                    <CardDescription>Buat album baru untuk mengelompokkan foto dokumentasi.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="judul">Judul Album</Label>
                            <Input id="judul" value={data.judul} onChange={e => setData('judul', e.target.value)} />
                            <InputError message={errors.judul} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="deskripsi">Deskripsi (Opsional)</Label>
                            <Textarea id="deskripsi" value={data.deskripsi} onChange={e => setData('deskripsi', e.target.value)} rows="3" />
                            <InputError message={errors.deskripsi} />
                        </div>
                        <Button type="submit" disabled={processing}>Simpan Album</Button>
                    </form>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}