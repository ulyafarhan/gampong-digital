import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';

export default function Index({ auth, settings, flash = {} }) {
    const { data, setData, put, processing, errors } = useForm({
        sejarah: settings.sejarah || '',
        visi: settings.visi || '',
        misi: settings.misi || '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route('admin.profil.update'));
    }

    return (
        <AuthenticatedLayout user={auth.user} header="Profil Gampong">
            <Head title="Profil Gampong" />
            
            {flash.message && <div className="bg-green-100 border-green-400 text-green-700 px-4 py-3 rounded mb-4 max-w-3xl mx-auto">{flash.message}</div>}

            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle>Edit Profil Gampong</CardTitle>
                    <CardDescription>Informasi ini akan ditampilkan di halaman "Tentang Kami" untuk publik.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="sejarah">Sejarah Singkat</Label>
                            <Textarea id="sejarah" value={data.sejarah} onChange={e => setData('sejarah', e.target.value)} rows="6" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="visi">Visi</Label>
                            <Textarea id="visi" value={data.visi} onChange={e => setData('visi', e.target.value)} rows="3" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="misi">Misi (Satu per baris)</Label>
                            <Textarea id="misi" value={data.misi} onChange={e => setData('misi', e.target.value)} rows="5" />
                        </div>
                        <Button type="submit" disabled={processing}>Simpan Perubahan</Button>
                    </form>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}