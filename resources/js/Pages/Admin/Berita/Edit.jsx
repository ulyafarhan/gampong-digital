import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import InputError from '@/Components/InputError';

export default function Edit({ auth, berita }) {
    const { data, setData, post, processing, errors } = useForm({
        judul: berita.judul,
        isi: berita.isi,
        gambar: null, // Input file selalu null saat inisialisasi
        _method: 'put', // Method spoofing untuk update dengan file
    });

    function handleSubmit(e) {
        e.preventDefault();
        // Kirim ke rute update dengan ID berita
        post(route('admin.berita.update', berita.id));
    }

    return (
        <AuthenticatedLayout user={auth.user} header="Berita">
            <Head title="Edit Berita" />
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Edit: {berita.judul}</CardTitle>
                    <CardDescription>Perbarui detail untuk berita ini.</CardDescription>
                </CardHeader>
                <CardContent>
                    {berita.gambar && (
                        <div className="mb-6">
                            <Label>Gambar Saat Ini</Label>
                            <img src={`/storage/${berita.gambar}`} alt={berita.judul} className="mt-2 w-full max-w-sm rounded-md border" />
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="judul">Judul</Label>
                            <Input id="judul" type="text" value={data.judul} onChange={(e) => setData('judul', e.target.value)} />
                            <InputError message={errors.judul}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="isi">Isi Berita</Label>
                            <Textarea id="isi" value={data.isi} onChange={(e) => setData('isi', e.target.value)} rows="10" />
                            <InputError message={errors.isi}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gambar">Ganti Gambar (Opsional)</Label>
                            <Input id="gambar" type="file" onChange={(e) => setData('gambar', e.target.files[0])} />
                            <InputError message={errors.gambar}/>
                        </div>
                        <Button type="submit" disabled={processing}>Perbarui Berita</Button>
                    </form>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}