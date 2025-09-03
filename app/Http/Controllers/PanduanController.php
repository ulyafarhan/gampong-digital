<?php
// File: app/Http/Controllers/PanduanController.php

namespace App\Http\Controllers;

use App\Models\Panduan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PanduanController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Panduan/Index', [
            'panduans' => Panduan::latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Panduan/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'syarat' => 'required|string', // Awalnya string dari textarea
            'alur' => 'required|string',   // Awalnya string dari textarea
            'estimasi_waktu' => 'required|string|max:100',
            'biaya' => 'required|string|max:100',
            'tips' => 'nullable|string',
        ]);

        // Ubah string dari textarea (dipisah per baris) menjadi array
        $syaratArray = array_filter(array_map('trim', explode("\n", $validatedData['syarat'])));
        $alurArray = array_filter(array_map('trim', explode("\n", $validatedData['alur'])));

        Panduan::create([
            'judul' => $validatedData['judul'],
            'slug' => Str::slug($validatedData['judul'], '-') . '-' . time(),
            'deskripsi' => $validatedData['deskripsi'],
            'syarat' => $syaratArray,
            'alur' => $alurArray,
            'estimasi_waktu' => $validatedData['estimasi_waktu'],
            'biaya' => $validatedData['biaya'],
            'tips' => $validatedData['tips'],
        ]);

        return to_route('admin.panduan.index')->with('message', 'Panduan administrasi berhasil ditambahkan!');
    }

    public function edit(Panduan $panduan)
    {
        return Inertia::render('Admin/Panduan/Edit', [
            'panduan' => $panduan,
        ]);
    }

    public function update(Request $request, Panduan $panduan)
    {
        $validatedData = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'syarat' => 'required|string',
            'alur' => 'required|string',
            'estimasi_waktu' => 'required|string|max:100',
            'biaya' => 'required|string|max:100',
            'tips' => 'nullable|string',
        ]);

        $syaratArray = array_filter(array_map('trim', explode("\n", $validatedData['syarat'])));
        $alurArray = array_filter(array_map('trim', explode("\n", $validatedData['alur'])));

        $panduan->update([
            'judul' => $validatedData['judul'],
            'slug' => Str::slug($validatedData['judul'], '-') . '-' . time(),
            'deskripsi' => $validatedData['deskripsi'],
            'syarat' => $syaratArray,
            'alur' => $alurArray,
            'estimasi_waktu' => $validatedData['estimasi_waktu'],
            'biaya' => $validatedData['biaya'],
            'tips' => $validatedData['tips'],
        ]);

        return to_route('admin.panduan.index')->with('message', 'Panduan administrasi berhasil diperbarui!');
    }

    public function destroy(Panduan $panduan)
    {
        $panduan->delete();
        return to_route('admin.panduan.index')->with('message', 'Panduan administrasi berhasil dihapus!');
    }
}