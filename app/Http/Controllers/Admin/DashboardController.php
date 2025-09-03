<?php
// File: app/Http/Controllers/Admin/DashboardController.php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Album;
use App\Models\Aparat;
use App\Models\Berita;
use App\Models\Kegiatan;
use App\Models\Panduan;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Mengambil data statistik
        $stats = [
            'berita' => Berita::count(),
            'panduan' => Panduan::count(),
            'kegiatan' => Kegiatan::count(),
            'album' => Album::count(),
            'aparat' => Aparat::count(),
        ];

        // Mengambil data terkini
        $beritaTerbaru = Berita::latest()->first();
        $kegiatanTerdekat = Kegiatan::where('tanggal_mulai', '>=', now())->orderBy('tanggal_mulai', 'asc')->first();

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'beritaTerbaru' => $beritaTerbaru,
            'kegiatanTerdekat' => $kegiatanTerdekat,
        ]);
    }
}