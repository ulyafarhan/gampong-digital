<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Album;

class AlbumSeeder extends Seeder
{
    public function run(): void
    {
        Album::create(['judul' => 'Peringatan Maulid Nabi 1447 H', 'deskripsi' => 'Dokumentasi perayaan Maulid Nabi di meunasah gampong.']);
        Album::create(['judul' => 'Gotong Royong Agustus 2025', 'deskripsi' => 'Kegiatan gotong royong membersihkan lingkungan gampong.']);
        Album::create(['judul' => 'Turnamen Voli Kemerdekaan', 'deskripsi' => 'Momen-momen seru dari turnamen voli antar dusun.']);
        Album::create(['judul' => 'Pelatihan PKK', 'deskripsi' => 'Kegiatan pelatihan keterampilan untuk ibu-ibu PKK.']);
        Album::create(['judul' => 'Penyerahan Bantuan Langsung Tunai', 'deskripsi' => 'Dokumentasi proses penyerahan BLT kepada warga.']);
    }
}