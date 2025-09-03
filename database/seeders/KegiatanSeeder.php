<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Kegiatan;
use Carbon\Carbon;

class KegiatanSeeder extends Seeder
{
    public function run(): void
    {
        Kegiatan::create(['nama_kegiatan' => 'Rapat Pemuda Bulanan', 'tanggal_mulai' => Carbon::now()->addDays(5), 'lokasi' => 'Balai Pemuda']);
        Kegiatan::create(['nama_kegiatan' => 'Pengajian Sibrul Mubtadin', 'tanggal_mulai' => Carbon::now()->addDays(7)->setTime(20, 0), 'lokasi' => 'Meunasah Gampong']);
        Kegiatan::create(['nama_kegiatan' => 'Gotong Royong Massal', 'tanggal_mulai' => Carbon::now()->addDays(10)->setTime(8, 0), 'lokasi' => 'Lingkungan Gampong']);
        Kegiatan::create(['nama_kegiatan' => 'Posyandu Balita & Lansia', 'tanggal_mulai' => Carbon::now()->addDays(15)->setTime(9, 0), 'lokasi' => 'Kantor Keuchik']);
        Kegiatan::create(['nama_kegiatan' => 'Peringatan Hari Kemerdekaan', 'tanggal_mulai' => Carbon::parse('2025-08-17'), 'lokasi' => 'Lapangan Gampong']);
    }
}