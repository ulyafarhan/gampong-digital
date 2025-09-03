// File: resources/js/Pages/Admin/Berita/Create.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        judul: '', isi: '', gambar: null,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('admin.berita.store'));
    }

    return (
        <AuthenticatedLayout user={auth.user} header="Berita">
            <Head title="Tambah Berita" />
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Formulir Berita Baru</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="judul">Judul</Label>
                            <Input id="judul" type="text" value={data.judul} onChange={(e) => setData('judul', e.target.value)} />
                            {errors.judul && <p className="text-red-500 text-xs mt-1">{errors.judul}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="isi">Isi Berita</Label>
                            <Textarea id="isi" value={data.isi} onChange={(e) => setData('isi', e.target.value)} rows="10" />
                            {errors.isi && <p className="text-red-500 text-xs mt-1">{errors.isi}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gambar">Gambar (Opsional)</Label>
                            <Input id="gambar" type="file" onChange={(e) => setData('gambar', e.target.files[0])} />
                            {errors.gambar && <p className="text-red-500 text-xs mt-1">{errors.gambar}</p>}
                        </div>
                        <Button type="submit" disabled={processing}>Simpan Berita</Button>
                    </form>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}