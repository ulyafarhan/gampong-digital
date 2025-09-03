<?php
// File: app/Http/Controllers/BeritaController.php

namespace App\Http\Controllers;

use App\Models\Berita;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class BeritaController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Berita/Index', [
            'flash' => session('message') ? ['message' => session('message')] : null,
            'beritas' => Berita::latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Berita/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'judul' => 'required|string|max:255',
            'isi' => 'required|string',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('gambar')) {
            $imagePath = $request->file('gambar')->store('berita_images', 'public');
        }

        Berita::create([
            'judul' => $validatedData['judul'],
            'slug' => Str::slug($validatedData['judul'], '-') . '-' . time(),
            'isi' => $validatedData['isi'],
            'gambar' => $imagePath,
            // Kolom 'ringkasan' tidak lagi diisi
        ]);
        
        return to_route('admin.berita.index')->with('message', 'Berita berhasil ditambahkan!');
    }

    public function edit(Berita $berita)
    {
        return Inertia::render('Admin/Berita/Edit', [ 'berita' => $berita ]);
    }

    public function update(Request $request, Berita $berita)
    {
        $validatedData = $request->validate([
            'judul' => 'required|string|max:255',
            'isi' => 'required|string',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imagePath = $berita->gambar;
        if ($request->hasFile('gambar')) {
            if ($berita->gambar) Storage::disk('public')->delete($berita->gambar);
            $imagePath = $request->file('gambar')->store('berita_images', 'public');
        }

        $berita->update([
            'judul' => $validatedData['judul'],
            'slug' => Str::slug($validatedData['judul'], '-') . '-' . time(),
            'isi' => $validatedData['isi'],
            'gambar' => $imagePath,
            // Kolom 'ringkasan' tidak lagi diisi
        ]);

        return to_route('admin.berita.index')->with('message', 'Berita berhasil diperbarui!');
    }

    public function destroy(Berita $berita)
    {
        if ($berita->gambar) Storage::disk('public')->delete($berita->gambar);
        $berita->delete();
        return to_route('admin.berita.index')->with('message', 'Berita berhasil dihapus!');
    }
}