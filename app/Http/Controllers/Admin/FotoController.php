<?php // app/Http/Controllers/Admin/FotoController.php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Album;
use App\Models\Foto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FotoController extends Controller
{
    public function store(Request $request, Album $album)
    {
        $request->validate([
            'fotos.*' => 'required|image|max:2048' // Validasi untuk setiap file
        ]);

        if ($request->hasFile('fotos')) {
            foreach ($request->file('fotos') as $file) {
                $path = $file->store('galeri_fotos', 'public');
                $album->fotos()->create(['path' => $path]);
            }
        }

        return back()->with('message', 'Foto berhasil diunggah.');
    }

    public function destroy(Foto $foto)
    {
        Storage::disk('public')->delete($foto->path);
        $foto->delete();
        return back()->with('message', 'Foto berhasil dihapus.');
    }
}