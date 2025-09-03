<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Import Controller
|--------------------------------------------------------------------------
|
| Mengelompokkan semua impor controller agar mudah dilihat.
|
*/
// Controllers untuk Halaman Publik
use App\Http\Controllers\PageController;
use App\Http\Controllers\CeurdasController;

// Controllers untuk Panel Admin
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProfilController;
use App\Http\Controllers\Admin\FotoController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\PanduanController;
use App\Http\Controllers\AparatController;
use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\AlbumController;

// Controllers untuk Autentikasi (Breeze)
use App\Http\Controllers\ProfileController;


/*
|--------------------------------------------------------------------------
| Rute Publik (Dilihat oleh semua orang)
|--------------------------------------------------------------------------
|
| Semua rute yang bisa diakses tanpa perlu login.
|
*/
Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/berita', [PageController::class, 'beritaIndex'])->name('berita.index');
Route::get('/berita/{berita:slug}', [PageController::class, 'beritaShow'])->name('berita.show');
Route::get('/galeri', [PageController::class, 'galeriIndex'])->name('galeri.index');
Route::get('/galeri/{album}', [PageController::class, 'galeriShow'])->name('galeri.show');
Route::get('/panduan', [PageController::class, 'panduanIndex'])->name('panduan.index');
Route::get('/kegiatan', [PageController::class, 'kegiatanIndex'])->name('kegiatan.index');
Route::get('/profil-gampong', [PageController::class, 'profilGampong'])->name('profil.gampong');



// Rute untuk Asisten Virtual 'Ceurdas'
Route::post('/ceurdas/ask', [CeurdasController::class, 'ask'])->name('ceurdas.ask');

/*
|--------------------------------------------------------------------------
| Rute Panel Admin
|--------------------------------------------------------------------------
|
| Semua rute ini memerlukan login dan terverifikasi,
| memiliki awalan URL /admin dan awalan nama admin.
|
*/
Route::prefix('admin')
    ->middleware(['auth', 'verified'])
    ->name('admin.')
    ->group(function () {
        
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // CRUD Modul
        Route::resource('berita', BeritaController::class)->parameters(['berita' => 'berita']);
        Route::resource('panduan', PanduanController::class);
        Route::resource('aparat', AparatController::class);
        Route::resource('kegiatan', KegiatanController::class);
        Route::resource('album', AlbumController::class);

        // Rute Khusus Galeri (Upload & Hapus Foto)
        Route::post('/album/{album}/fotos', [FotoController::class, 'store'])->name('album.fotos.store');
        Route::delete('/fotos/{foto}', [FotoController::class, 'destroy'])->name('fotos.destroy');
        
        // Rute Profil Gampong (Settings)
        Route::get('/profil', [ProfilController::class, 'index'])->name('profil.index');
        Route::put('/profil', [ProfilController::class, 'update'])->name('profil.update');
    });


/*
|--------------------------------------------------------------------------
| Rute Profil Pengguna (Breeze)
|--------------------------------------------------------------------------
|
| Rute ini dipisahkan karena merupakan bagian dari
| fungsionalitas inti Breeze untuk manajemen akun pengguna.
| URL-nya tidak memiliki awalan /admin.
|
*/
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// Memuat rute autentikasi bawaan Laravel Breeze
require __DIR__.'/auth.php';