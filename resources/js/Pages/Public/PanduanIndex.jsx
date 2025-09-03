import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion';
import { CheckCircle2 } from 'lucide-react';

export default function PanduanIndex({ panduans }) {
    return (
        <PublicLayout title="Panduan Administrasi">
            <main className="py-12 sm:py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-['Merriweather'] font-bold text-green-900 dark:text-white">
                            Panduan Layanan Administrasi
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            Semua yang perlu Anda ketahui tentang pengurusan administrasi di Gampong Udeung.
                        </p>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                        {panduans.map((panduan) => (
                             <AccordionItem key={panduan.id} value={`item-${panduan.id}`}>
                                <AccordionTrigger className="text-lg font-semibold hover:no-underline text-left">
                                    {panduan.judul}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-6 pt-2">
                                        <p className="text-base text-muted-foreground">{panduan.deskripsi}</p>
                                        
                                        <div>
                                            <h3 className="font-bold text-md mb-2">Syarat-syarat:</h3>
                                            <ul className="space-y-2">
                                                {panduan.syarat.map((item, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0"/>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-md mb-2">Alur Proses:</h3>
                                            <ol className="list-decimal list-inside space-y-2">
                                                {panduan.alur.map((item, index) => <li key={index}>{item}</li>)}
                                            </ol>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                                                <p className="font-semibold">Estimasi Waktu</p>
                                                <p>{panduan.estimasi_waktu}</p>
                                            </div>
                                            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                                                <p className="font-semibold">Biaya</p>
                                                <p>{panduan.biaya}</p>
                                            </div>
                                        </div>
                                        
                                        {panduan.tips && (
                                            <div className="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-50 dark:bg-gray-800">
                                                <h4 className="font-bold">Tips Praktis</h4>
                                                <p className="text-sm text-muted-foreground">{panduan.tips}</p>
                                            </div>
                                        )}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </main>
        </PublicLayout>
    );
}