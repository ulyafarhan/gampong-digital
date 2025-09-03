<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Berita;
use Illuminate\Support\Str;

class BeritaSeeder extends Seeder
{
    public function run(): void
    {
        $beritas = [
            ['judul' => 'Gotong Royong Membersihkan Saluran Irigasi Gampong', 'isi' => 'Seluruh warga Gampong Udeung berpartisipasi aktif dalam kegiatan gotong royong massal untuk membersihkan saluran irigasi utama. Kegiatan ini bertujuan untuk melancarkan aliran air ke sawah-sawah warga menjelang musim tanam.'],
            ['judul' => 'Peringatan Maulid Nabi Muhammad SAW di Meunasah Gampong', 'isi' => 'Gampong Udeung merayakan Maulid Nabi Muhammad SAW dengan meriah. Acara diisi dengan zikir bersama, ceramah agama oleh Tgk. H. Abdullah, dan santunan untuk anak yatim.'],
            ['judul' => 'Pelatihan Pembuatan Kue Kering untuk Ibu-Ibu PKK', 'isi' => 'Tim Penggerak PKK Gampong Udeung menyelenggarakan pelatihan pembuatan kue kering. Pelatihan ini diharapkan dapat meningkatkan keterampilan dan membuka peluang usaha bagi ibu-ibu di gampong.'],
            ['judul' => 'Turnamen Voli Antar Dusun Resmi Dibuka oleh Keuchik', 'isi' => 'Keuchik Gampong Udeung secara resmi membuka turnamen bola voli antar dusun. Turnamen ini bertujuan untuk mempererat tali silaturahmi antar pemuda dan warga.'],
            ['judul' => 'Sosialisasi Bahaya Narkoba dari BNNK Pidie Jaya', 'isi' => 'Badan Narkotika Nasional Kabupaten (BNNK) Pidie Jaya memberikan sosialisasi tentang bahaya narkoba kepada para pemuda dan remaja di balai desa. Acara ini menekankan pentingnya peran keluarga dalam pencegahan.'],
        ];

        foreach ($beritas as $berita) {
            Berita::create([
                'judul' => $berita['judul'],
                'slug' => Str::slug($berita['judul'], '-') . '-' . time(),
                'isi' => $berita['isi'],
                'gambar' => null,
            ]);
        }
    }
}