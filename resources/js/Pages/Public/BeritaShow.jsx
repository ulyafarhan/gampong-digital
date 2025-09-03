import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
};

export default function BeritaShow({ berita }) {
    return (
        <PublicLayout title={berita.judul}>
            <main className="py-12 sm:py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <article>
                        {/* Header Artikel */}
                        <header className="mb-8">
                            <p className="text-base text-green-700 dark:text-green-400 font-semibold">
                                {formatDate(berita.created_at)}
                            </p>
                            <h1 className="mt-2 text-3xl md:text-5xl font-['Merriweather'] font-bold text-gray-900 dark:text-white leading-tight">
                                {berita.judul}
                            </h1>
                        </header>
                        
                        {/* Gambar Utama */}
                        {berita.gambar && (
                            <figure className="my-8">
                                <img 
                                    src={`/storage/${berita.gambar}`} 
                                    alt={berita.judul} 
                                    className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg"
                                />
                            </figure>
                        )}
                        
                        {/* Isi Konten Berita */}
                        <div 
                            className="prose prose-lg dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: berita.isi.replace(/\n/g, '<br />') }} 
                        />
                    </article>
                </div>
            </main>
        </PublicLayout>
    );
}