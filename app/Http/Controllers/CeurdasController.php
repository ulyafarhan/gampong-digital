<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Exception;

class CeurdasController extends Controller
{
    public function ask(Request $request)
    {
        $request->validate([
            'question' => 'required|string|max:1000',
            'history' => 'nullable|array'
        ]);

        $userQuestion = $request->input('question');
        $history = $request->input('history', []);
        
        $apiKey = config('services.google.key');
        if (!$apiKey) {
            Log::error('Google AI API Key not found.');
            return response()->json(['answer' => 'Konfigurasi AI di server belum diatur.'], 500);
        }

        $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={$apiKey}";

        // Instruksi baru tanpa permintaan untuk menggunakan emoji
        $systemPrompt = "
            Anda adalah 'Ceurdas', asisten AI resmi dari Gampong Udeung yang sangat ramah, hangat, dan profesional.
            Misi Anda adalah membuat warga merasa nyaman dan terbantu, seolah-olah mereka sedang berbicara dengan staf gampong yang baik hati dan kompeten.

            ATURAN GAYA BAHASA:
            - Selalu gunakan sapaan yang akrab dan personal (contoh: 'Halo Bapak/Ibu', 'Tentu, dengan senang hati saya bantu').
            - Gunakan bahasa Indonesia yang santai, jelas, dan mudah dimengerti. HINDARI bahasa yang kaku, birokratis, atau seperti robot.
            - Gunakan emoji sewajarnya untuk menambah kesan ramah (contoh: 😊, 👍, ✅).. Berikan jawaban dalam bentuk teks murni yang bersih.
            
            ATURAN FORMAT:
            - Untuk membuat daftar atau list, GUNAKAN penomoran (1., 2., 3.) atau tanda hubung (-). JANGAN PERNAH menggunakan simbol bintang (*).
            - Gunakan paragraf pendek agar mudah dibaca.

            FOKUS JAWABAN:
            - Jawab hanya pertanyaan seputar layanan dan administrasi di Gampong Udeung.
            - Jika ada pertanyaan di luar topik itu, tolak dengan sopan dan kembalikan percakapan ke topik gampong.
        ";
        
        $contents = [
            ['role' => 'user', 'parts' => [['text' => $systemPrompt]]],
            ['role' => 'model', 'parts' => [['text' => "Tentu, saya Ceurdas. Ada yang bisa saya bantu terkait urusan di Gampong Udeung?"]]]
        ];

        foreach ($history as $message) {
            if (empty($message['text'])) continue;
            $role = ($message['sender'] === 'user') ? 'user' : 'model';
            $contents[] = ['role' => $role, 'parts' => [['text' => $message['text']]]];
        }

        $contents[] = ['role' => 'user', 'parts' => [['text' => $userQuestion]]];

        $payload = ['contents' => $contents];

        try {
            $response = Http::withHeaders(['Content-Type' => 'application/json'])->post($url, $payload);

            if ($response->successful()) {
                $answer = $response->json()['candidates'][0]['content']['parts'][0]['text'];
                return response()->json(['answer' => trim($answer)]);
            }

            Log::error('Google AI API Error: ' . $response->body());
            return response()->json(['answer' => 'Maaf, terjadi masalah saat menghubungi Asisten AI.'], 500);

        } catch (Exception $e) {
            Log::error('Ceurdas Controller Exception: ' . $e->getMessage());
            return response()->json(['answer' => 'Maaf, server sedang sibuk. Coba lagi nanti.'], 500);
        }
    }
}