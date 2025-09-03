<?php
// File: app/Http/Controllers/KegiatanController.php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KegiatanController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Kegiatan/Index', [
            'kegiatans' => Kegiatan::orderBy('tanggal_mulai', 'desc')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Kegiatan/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nama_kegiatan' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'nullable|date|after_or_equal:tanggal_mulai',
            'lokasi' => 'nullable|string|max:255',
        ]);

        Kegiatan::create($validatedData);

        return to_route('admin.kegiatan.index')->with('message', 'Kegiatan baru berhasil ditambahkan!');
    }

    public function edit(Kegiatan $kegiatan)
    {
        return Inertia::render('Admin/Kegiatan/Edit', [
            'kegiatan' => $kegiatan,
        ]);
    }

    public function update(Request $request, Kegiatan $kegiatan)
    {
        $validatedData = $request->validate([
            'nama_kegiatan' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'nullable|date|after_or_equal:tanggal_mulai',
            'lokasi' => 'nullable|string|max:255',
        ]);

        $kegiatan->update($validatedData);

        return to_route('admin.kegiatan.index')->with('message', 'Kegiatan berhasil diperbarui!');
    }

    public function destroy(Kegiatan $kegiatan)
    {
        $kegiatan->delete();
        return to_route('admin.kegiatan.index')->with('message', 'Kegiatan berhasil dihapus!');
    }
}