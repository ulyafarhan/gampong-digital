<?php
// File: app/Http/Controllers/PageController.php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Aparat;
use App\Models\Berita;
use App\Models\Kegiatan;
use App\Models\Panduan;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class PageController extends Controller
{
    // Halaman Beranda / Home
    public function home()
    {
        return Inertia::render('Public/Home', [
            'beritas' => Berita::latest()->take(3)->get(),
            'panduans' => Panduan::latest()->take(4)->get(),
            'kegiatans' => Kegiatan::where('tanggal_mulai', '>=', now())->orderBy('tanggal_mulai', 'asc')->take(3)->get(),
            'albumTerbaru' => Album::with('fotos')->latest()->first(),
        ]);
    }

    // Halaman Daftar Berita
    public function beritaIndex()
    {
        return Inertia::render('Public/BeritaIndex', [
            'beritas' => Berita::latest()->paginate(9), // Menggunakan paginasi
        ]);
    }

    // Halaman Detail Satu Berita
    public function beritaShow(Berita $berita)
    {
        return Inertia::render('Public/BeritaShow', [
            'berita' => $berita,
        ]);
    }

    // Halaman Daftar Galeri (Album)
    public function galeriIndex()
    {
        return Inertia::render('Public/GaleriIndex', [
            'albums' => Album::with('fotos')->latest()->get(),
        ]);
    }

    // Halaman Detail Satu Album dengan Horizontal Scroll
    public function galeriShow(Album $album)
    {
        $album->load('fotos'); // Memastikan semua foto ter-load
        return Inertia::render('Public/GaleriShow', [
            'album' => $album,
        ]);
    }

    public function panduanIndex()
    {
        return Inertia::render('Public/PanduanIndex', [
            'panduans' => Panduan::latest()->get(),
        ]);
    }

    public function kegiatanIndex()
    {
        return Inertia::render('Public/KegiatanIndex', [
            'kegiatanAkanDatang' => Kegiatan::where('tanggal_mulai', '>=', now())
                                            ->orderBy('tanggal_mulai', 'asc')
                                            ->get(),
            'kegiatanTelahLewat' => Kegiatan::where('tanggal_mulai', '<', now())
                                            ->orderBy('tanggal_mulai', 'desc')
                                            ->paginate(5),
        ]);
    }
}