import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import InputError from '@/Components/InputError';

export default function Edit({ auth, aparat }) {
    const { data, setData, post, processing, errors } = useForm({
        nama: aparat.nama, 
        jabatan: aparat.jabatan, 
        foto: null, 
        urutan: aparat.urutan,
        _method: 'put', // Method spoofing untuk update dengan file
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('admin.aparat.update', aparat.id));
    }

    return (
        <AuthenticatedLayout user={auth.user} header={`Edit: ${aparat.nama}`}>
            <Head title="Edit Aparat" />
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Edit Data Aparat</CardTitle>
                    <CardDescription>Perbarui detail untuk {aparat.nama}.</CardDescription>
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
                            <Label htmlFor="foto">Ganti Foto (Opsional)</Label>
                            <Input id="foto" type="file" onChange={e => setData('foto', e.target.files[0])} />
                            <InputError message={errors.foto} />
                        </div>
                        <Button type="submit" disabled={processing}>Perbarui Data</Button>
                    </form>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}