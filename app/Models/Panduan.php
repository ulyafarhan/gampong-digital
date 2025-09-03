<?php
// File: app/Models/Panduan.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Panduan extends Model
{
    use HasFactory;

    protected $fillable = [
        'judul',
        'slug',
        'deskripsi',
        'syarat',
        'alur',
        'estimasi_waktu',
        'biaya',
        'tips',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'syarat' => 'array', // Otomatis konversi JSON ke Array & sebaliknya
        'alur' => 'array',   // Otomatis konversi JSON ke Array & sebaliknya
    ];
}