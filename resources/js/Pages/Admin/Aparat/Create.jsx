import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import InputError from '@/Components/InputError';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        nama: '', 
        jabatan: '', 
        foto: null, 
        urutan: 0
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('admin.aparat.store'));
    }

    return (
        <AuthenticatedLayout user={auth.user} header="Aparat Baru">
            <Head title="Tambah Aparat" />
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Formulir Aparat Baru</CardTitle>
                    <CardDescription>Masukkan detail untuk aparat gampong yang baru.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="nama">Nama Lengkap</Label>
                            <Input id="nama" type="text" value={data.nama} onChange={e => setData('nama', e.target.value)} />
                            <InputError message={errors.nama} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="jabatan">Jabatan</Label>
                            <Input id="jabatan" type="text" value={data.jabatan} onChange={e => setData('jabatan', e.target.value)} />
                            <InputError message={errors.jabatan} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="urutan">Urutan Tampil</Label>
                            <Input id="urutan" type="number" value={data.urutan} onChange={e => setData('urutan', e.target.value)} />
                            <InputError message={errors.urutan} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="foto">Foto</Label>
                            <Input id="foto" type="file" onChange={e => setData('foto', e.target.files[0])} />
                            <InputError message={errors.foto} />
                        </div>
                        <Button type="submit" disabled={processing}>Simpan Aparat</Button>
                    </form>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}