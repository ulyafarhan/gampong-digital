<?php
namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\Kegiatan;
use App\Models\Panduan;
use App\Models\Album;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'beritas' => Berita::latest()->take(3)->get(),
            'panduans' => Panduan::latest()->take(4)->get(),
            'kegiatans' => Kegiatan::where('tanggal_mulai', '>=', now())->orderBy('tanggal_mulai', 'asc')->take(3)->get(),
            'albumTerbaru' => Album::with('fotos')->latest()->first(),
        ]);
    }
}