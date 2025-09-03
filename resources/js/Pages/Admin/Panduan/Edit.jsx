import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import InputError from '@/Components/InputError';

export default function Edit({ auth, panduan }) {
    const { data, setData, put, processing, errors } = useForm({
        judul: panduan.judul,
        deskripsi: panduan.deskripsi,
        syarat: panduan.syarat.join('\n'),
        alur: panduan.alur.join('\n'),
        estimasi_waktu: panduan.estimasi_waktu,
        biaya: panduan.biaya,
        tips: panduan.tips || '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route('admin.panduan.update', panduan.id));
    }

    return (
        <AuthenticatedLayout user={auth.user} header="Edit Panduan">
            <Head title="Edit Panduan" />
            <Card className="max-w-4xl mx-auto">
                <CardHeader><CardTitle>Formulir Edit Panduan</CardTitle></CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="judul">Judul Panduan</Label>
                                <Input id="judul" value={data.judul} onChange={e => setData('judul', e.target.value)} />
                                <InputError message={errors.judul}/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="estimasi_waktu">Estimasi Waktu</Label>
                                <Input id="estimasi_waktu" value={data.estimasi_waktu} onChange={e => setData('estimasi_waktu', e.target.value)} placeholder="Contoh: 3-5 Hari Kerja" />
                                <InputError message={errors.estimasi_waktu}/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="biaya">Biaya</Label>
                                <Input id="biaya" value={data.biaya} onChange={e => setData('biaya', e.target.value)} placeholder="Contoh: Gratis / Rp 25.000" />
                                <InputError message={errors.biaya}/>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="deskripsi">Deskripsi Singkat</Label>
                            <Textarea id="deskripsi" value={data.deskripsi} onChange={e => setData('deskripsi', e.target.value)} rows="3" />
                            <InputError message={errors.deskripsi}/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="syarat">Daftar Syarat (Satu per baris)</Label>
                                <Textarea id="syarat" value={data.syarat} onChange={e => setData('syarat', e.target.value)} rows="8" />
                                <InputError message={errors.syarat}/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="alur">Alur Langkah (Satu per baris)</Label>
                                <Textarea id="alur" value={data.alur} onChange={e => setData('alur', e.target.value)} rows="8" />
                                <InputError message={errors.alur}/>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tips">Tips Praktis (Opsional)</Label>
                            <Textarea id="tips" value={data.tips} onChange={e => setData('tips', e.target.value)} rows="3" />
                        </div>
                        <Button type="submit" disabled={processing}>Perbarui Panduan</Button>
                    </form>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}