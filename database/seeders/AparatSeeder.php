<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Aparat;

class AparatSeeder extends Seeder
{
    public function run(): void
    {
        Aparat::create(['nama' => 'Muhammad Ulya', 'jabatan' => 'Keuchik', 'urutan' => 1]);
        Aparat::create(['nama' => 'Ahmad Fauzi', 'jabatan' => 'Sekretaris Desa', 'urutan' => 2]);
        Aparat::create(['nama' => 'Zainuddin', 'jabatan' => 'Kaur Keuangan', 'urutan' => 3]);
        Aparat::create(['nama' => 'Siti Khadijah', 'jabatan' => 'Kaur Umum & Perencanaan', 'urutan' => 4]);
        Aparat::create(['nama' => 'Abdullah', 'jabatan' => 'Kepala Dusun Damai', 'urutan' => 5]);
    }
}