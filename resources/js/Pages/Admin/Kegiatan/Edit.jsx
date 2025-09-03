import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import InputError from '@/Components/InputError';

// Fungsi helper untuk format tanggal ke YYYY-MM-DDTHH:MM
const formatToDateTimeLocal = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 16);
};

export default function Edit({ auth, kegiatan }) {
    const { data, setData, put, processing, errors } = useForm({
        nama_kegiatan: kegiatan.nama_kegiatan,
        deskripsi: kegiatan.deskripsi || '',
        tanggal_mulai: formatToDateTimeLocal(kegiatan.tanggal_mulai),
        tanggal_selesai: formatToDateTimeLocal(kegiatan.tanggal_selesai),
        lokasi: kegiatan.lokasi || '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route('admin.kegiatan.update', kegiatan.id));
    }

    return (
        <AuthenticatedLayout user={auth.user} header={`Edit Kegiatan`}>
            <Head title="Edit Kegiatan" />
             <Card className="max-w-2xl mx-auto">
                <CardHeader><CardTitle>Edit: {kegiatan.nama_kegiatan}</CardTitle></CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                         <div className="space-y-2">
                            <Label htmlFor="nama_kegiatan">Nama Kegiatan</Label>
                            <Input id="nama_kegiatan" value={data.nama_kegiatan} onChange={e => setData('nama_kegiatan', e.target.value)} />
                            <InputError message={errors.nama_kegiatan} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="tanggal_mulai">Tanggal & Waktu Mulai</Label>
                                <Input id="tanggal_mulai" type="datetime-local" value={data.tanggal_mulai} onChange={e => setData('tanggal_mulai', e.target.value)} />
                                <InputError message={errors.tanggal_mulai} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tanggal_selesai">Tanggal & Waktu Selesai (Opsional)</Label>
                                <Input id="tanggal_selesai" type="datetime-local" value={data.tanggal_selesai} onChange={e => setData('tanggal_selesai', e.target.value)} />
                                <InputError message={errors.tanggal_selesai} />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="lokasi">Lokasi</Label>
                            <Input id="lokasi" value={data.lokasi} onChange={e => setData('lokasi', e.target.value)} />
                            <InputError message={errors.lokasi} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="deskripsi">Deskripsi (Opsional)</Label>
                            <Textarea id="deskripsi" value={data.deskripsi} onChange={e => setData('deskripsi', e.target.value)} rows="4" />
                            <InputError message={errors.deskripsi} />
                        </div>
                        <Button type="submit" disabled={processing}>Perbarui Kegiatan</Button>
                    </form>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}