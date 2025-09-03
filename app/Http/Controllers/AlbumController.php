<?php // app/Http/Controllers/AlbumController.php
namespace App\Http\Controllers;
use App\Models\Album;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AlbumController extends Controller
{
    public function index()
    {
        // Eager load relasi 'fotos' untuk efisiensi
        $albums = Album::with('fotos')->latest()->get();
        return Inertia::render('Admin/Album/Index', ['albums' => $albums]);
    }

    public function create()
    {
        return Inertia::render('Admin/Album/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
        ]);
        Album::create($validated);
        return to_route('admin.album.index')->with('message', 'Album berhasil dibuat.');
    }

    public function show(Album $album)
    {
        // Muat relasi foto untuk ditampilkan di halaman detail
        $album->load('fotos');
        return Inertia::render('Admin/Album/Show', ['album' => $album]);
    }

    public function edit(Album $album)
    {
        return Inertia::render('Admin/Album/Edit', ['album' => $album]);
    }

    public function update(Request $request, Album $album)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
        ]);
        $album->update($validated);
        return to_route('admin.album.index')->with('message', 'Album berhasil diperbarui.');
    }

    public function destroy(Album $album)
    {
        // Hapus semua file foto dari storage sebelum menghapus album
        foreach ($album->fotos as $foto) {
            Storage::disk('public')->delete($foto->path);
        }
        $album->delete(); // Ini akan otomatis menghapus record foto karena onDelete('cascade')
        return to_route('admin.album.index')->with('message', 'Album dan semua fotonya berhasil dihapus.');
    }
}