<?php // File: app/Http/Controllers/AparatController.php
namespace App\Http\Controllers;

use App\Models\Aparat;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AparatController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Aparat/Index', [
            'aparats' => Aparat::orderBy('urutan')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Aparat/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'foto' => 'nullable|image|max:2048',
            'urutan' => 'required|integer',
        ]);

        $fotoPath = null;
        if ($request->hasFile('foto')) {
            $fotoPath = $request->file('foto')->store('aparat_fotos', 'public');
        }

        Aparat::create(array_merge($validatedData, ['foto' => $fotoPath]));

        return to_route('admin.aparat.index')->with('message', 'Aparat gampong berhasil ditambahkan!');
    }

    public function edit(Aparat $aparat)
    {
        return Inertia::render('Admin/Aparat/Edit', ['aparat' => $aparat]);
    }

    public function update(Request $request, Aparat $aparat)
    {
        $validatedData = $request->validate([
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'foto' => 'nullable|image|max:2048',
            'urutan' => 'required|integer',
        ]);

        $fotoPath = $aparat->foto;
        if ($request->hasFile('foto')) {
            if ($aparat->foto) {
                Storage::disk('public')->delete($aparat->foto);
            }
            $fotoPath = $request->file('foto')->store('aparat_fotos', 'public');
        }

        $aparat->update(array_merge($validatedData, ['foto' => $fotoPath]));

        return to_route('admin.aparat.index')->with('message', 'Data aparat berhasil diperbarui!');
    }

    public function destroy(Aparat $aparat)
    {
        if ($aparat->foto) {
            Storage::disk('public')->delete($aparat->foto);
        }
        $aparat->delete();
        return to_route('admin.aparat.index')->with('message', 'Data aparat berhasil dihapus!');
    }
}