<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Panduan;
use Illuminate\Support\Str;

class PanduanSeeder extends Seeder
{
    public function run(): void
    {
        $panduans = [
            [
                'judul' => 'Pengurusan Kartu Tanda Penduduk (KTP)',
                'deskripsi' => 'Panduan lengkap untuk warga yang ingin membuat KTP baru atau mengganti KTP yang rusak/hilang.',
                'syarat' => ['Fotokopi Kartu Keluarga', 'Surat Pengantar dari Keuchik', 'Pas Foto 3x4 Latar Merah (2 lembar)'],
                'alur' => ['Minta Surat Pengantar di Kantor Keuchik', 'Bawa berkas ke Kantor Camat', 'Lakukan perekaman data di Disdukcapil'],
                'estimasi_waktu' => '14 Hari Kerja',
                'biaya' => 'Gratis',
            ],
            [
                'judul' => 'Pembuatan Surat Keterangan Domisili',
                'deskripsi' => 'Langkah-langkah untuk mendapatkan Surat Keterangan Domisili bagi warga yang baru pindah ke gampong.',
                'syarat' => ['Fotokopi KTP', 'Fotokopi KK', 'Surat Pengantar dari Keuchik'],
                'alur' => ['Datang ke Kantor Keuchik dengan berkas lengkap', 'Isi formulir permohonan', 'Tunggu proses verifikasi dan penerbitan surat'],
                'estimasi_waktu' => '3 Hari Kerja',
                'biaya' => 'Rp 10.000',
            ],
            [
                'judul' => 'Pendaftaran Akta Kelahiran',
                'deskripsi' => 'Panduan untuk mendaftarkan akta kelahiran anak baru lahir di gampong.',
                'syarat' => ['Fotokopi KTP Orang Tua', 'Fotokopi KK', 'Surat Kelahiran dari Rumah Sakit/Bidan'],
                'alur' => ['Kumpulkan berkas persyaratan', 'Datang ke Kantor Dinas Kependudukan dan Catatan Sipil', 'Isi formulir pendaftaran akta kelahiran'],
                'estimasi_waktu' => '7 Hari Kerja',
                'biaya' => 'Gratis',
            ],
            [
                'judul' => 'Pembuatan Surat Izin Usaha Mikro (SIUM)',
                'deskripsi' => 'Langkah-langkah untuk mendapatkan Surat Izin Usaha Mikro bagi pelaku usaha kecil di gampong.',
                'syarat' => ['Fotokopi KTP', 'Fotokopi KK', 'Surat Keterangan Domisili Usaha'],
                'alur' => ['Datang ke Kantor Keuchik dengan berkas lengkap', 'Isi formulir permohonan   SIUM', 'Tunggu proses verifikasi dan penerbitan surat'],
                'estimasi_waktu' => '5 Hari Kerja',
                'biaya' => 'Rp 50.000', 
            ],
            [
                'judul' => 'Pengurusan Kartu Keluarga (KK) Baru',
                'deskripsi' => 'Panduan untuk pasangan yang baru menikah atau keluarga yang ingin membuat Kartu Keluarga (KK) baru.',
                'syarat' => ['Surat Pengantar dari Kantor Keuchik', 'Fotokopi Buku Nikah / Akta Perkawinan', 'Fotokopi KTP suami dan istri', 'Mengisi Formulir F-1.01 yang disediakan'],
                'alur' => ['Lengkapi semua berkas persyaratan', 'Serahkan berkas ke Kantor Keuchik untuk didata dan mendapatkan pengantar', 'Bawa berkas yang sudah lengkap ke Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil)'],
                'estimasi_waktu' => '7 - 14 Hari Kerja',
                'biaya' => 'Gratis',
                'tips' => 'Pastikan nama dan NIK pada semua dokumen sudah sesuai dan tidak ada kesalahan ketik.'
            ],
            [
                'judul' => 'Pengurusan Surat Keterangan Usaha (SKU)',
                'deskripsi' => 'Panduan bagi warga yang memiliki usaha dan memerlukan Surat Keterangan Usaha (SKU) untuk keperluan administrasi, seperti pinjaman bank atau perizinan lainnya.',
                'syarat' => ['Fotokopi KTP Pemilik Usaha', 'Fotokopi Kartu Keluarga (KK)', 'Surat Pengantar dari Kantor Keuchik', 'Foto tempat usaha jika diperlukan'],
                'alur' => ['Siapkan dokumen persyaratan', 'Datang ke Kantor Keuchik dan sampaikan maksud untuk membuat SKU', 'Petugas akan melakukan verifikasi dan membuatkan surat', 'Surat akan ditandatangani oleh Keuchik'],
                'estimasi_waktu' => '1 - 2 Hari Kerja',
                'biaya' => 'Gratis (atau sesuai kebijakan gampong)',
                'tips' => 'Jelaskan jenis usaha Anda dengan detail kepada petugas agar tidak terjadi kesalahan penulisan di surat.'
            ],
            [
                'judul' => 'Pembuatan Surat Keterangan Tidak Mampu (SKTM)',
                'deskripsi' => 'Panduan bagi warga yang memerlukan Surat Keterangan Tidak Mampu (SKTM) untuk keperluan bantuan sosial atau administrasi lainnya.',
                'syarat' => ['Fotokopi KTP', 'Fotokopi KK', 'Surat Pengantar dari Keuchik', 'Dokumen pendukung lainnya jika diperlukan'],
                'alur' => ['Kumpulkan semua dokumen persyaratan', 'Datang ke Kantor Keuchik dan ajukan permohonan SKTM', 'Petugas akan melakukan verifikasi data', 'Tunggu proses pembuatan dan penandatanganan surat oleh Keuchik'],
                'estimasi_waktu' => '3 - 5 Hari Kerja',
                'biaya' => 'Gratis',
                'tips' => 'Pastikan data yang Anda berikan akurat untuk menghindari penolakan permohonan.'
            ],
            [
                'judul' => 'Pendaftaran Akta Perkawinan',
                'deskripsi' => 'Panduan bagi pasangan yang baru menikah untuk mendaftarkan akta perkawinan di gampong.',
                'syarat' => ['Fotokopi KTP kedua mempelai', 'Fotokopi KK kedua mempelai', 'Surat Nikah dari Kantor Urusan Agama (KUA) atau catatan sipil', 'Pas Foto 3x4 kedua mempelai (2 lembar)'],
                'alur' => ['Kumpulkan semua dokumen persyaratan', 'Datang ke Kantor Dinas Kependudukan dan Catatan Sipil (Disdukcapil)', 'Isi formulir pendaftaran akta perkawinan', 'Serahkan berkas dan tunggu proses verifikasi dan penerbitan akta'],
                'estimasi_waktu' => '14 Hari Kerja',
                'biaya' => 'Gratis',
                'tips' => 'Segera daftarkan akta perkawinan setelah menikah untuk menghindari denda keterlambatan.'
            ]
        ];
        
        // Hapus data lama agar tidak duplikat
        Panduan::query()->delete();

        foreach ($panduans as $panduan) {
            Panduan::create(array_merge($panduan, ['slug' => Str::slug($panduan['judul'])]));
        }
    }
}