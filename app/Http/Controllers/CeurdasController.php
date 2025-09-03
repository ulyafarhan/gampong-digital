<?php
// File: app/Http/Controllers/CeurdasController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Panduan;
use Gemini;

class CeurdasController extends Controller
{
    public function ask(Request $request)
    {
        $request->validate(['question' => 'required|string|max:500']);
        $userQuestion = $request->input('question');

        // 1. Cari Konteks di Database
        // Kita cari panduan yang judulnya paling mirip dengan pertanyaan
        $keywords = explode(' ', $userQuestion);
        $panduan = Panduan::where(function ($query) use ($keywords) {
            foreach ($keywords as $keyword) {
                $query->orWhere('judul', 'LIKE', "%{$keyword}%");
            }
        })->first();

        $context = "Tidak ada informasi spesifik dalam database. Jawab berdasarkan pengetahuan umum tentang administrasi desa di Indonesia.";
        if ($panduan) {
            $context = "Berdasarkan panduan resmi Gampong Udeung tentang '{$panduan->judul}', berikut adalah informasinya:\n";
            $context .= "- Deskripsi: {$panduan->deskripsi}\n";
            $context .= "- Syarat: " . implode(', ', $panduan->syarat) . "\n";
            $context .= "- Alur: " . implode(' -> ', $panduan->alur) . "\n";
            $context .= "- Estimasi Waktu: {$panduan->estimasi_waktu}\n";
            $context .= "- Biaya: {$panduan->biaya}\n";
            $context .= $panduan->tips ? "- Tips: {$panduan->tips}\n" : '';
        }

        // 2. Buat Prompt untuk Gemini
        $prompt = "Anda adalah 'Ceurdas', asisten virtual AI untuk Gampong Udeung yang ramah dan membantu dalam Bahasa Indonesia. Tugas Anda adalah menjawab pertanyaan warga seputar administrasi gampong. Jawablah dengan singkat, jelas, dan sopan.\n\n";
        $prompt .= "Gunakan informasi di bawah ini sebagai sumber utama jawaban Anda:\n---\n{$context}\n---\n\n";
        $prompt .= "Pertanyaan Warga: \"{$userQuestion}\"\n\nJawaban Anda:";

        // 3. Panggil Gemini API
        if (empty(env('GEMINI_API_KEY'))) {
            return response()->json(['answer' => 'Mohon maaf, layanan AI sedang tidak aktif. Silakan hubungi administrator.']);
        }

        try {
            $client = Gemini::client(env('GEMINI_API_KEY'));
            $result = $client->geminiPro()->generateContent($prompt);

            return response()->json(['answer' => $result->text()]);
        } catch (\Exception $e) {
            report($e);
            return response()->json(['answer' => 'Mohon maaf, terjadi sedikit gangguan pada asisten AI. Coba beberapa saat lagi.']);
        }
    }
}