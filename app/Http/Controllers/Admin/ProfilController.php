<?php // File: app/Http/Controllers/Admin/ProfilController.php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfilController extends Controller
{
    public function index()
    {
        // Ambil semua settings dan ubah menjadi format key => value
        $settings = Setting::all()->pluck('value', 'key');
        
        return Inertia::render('Admin/Profil/Index', [
            'settings' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'sejarah' => 'nullable|string',
            'visi' => 'nullable|string',
            'misi' => 'nullable|string',
        ]);

        foreach ($validatedData as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value ?? '']
            );
        }

        return to_route('admin.profil.index')->with('message', 'Profil gampong berhasil diperbarui!');
    }
}