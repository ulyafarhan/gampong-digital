<?php // app/Models/Foto.php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo; // <-- Impor ini

class Foto extends Model
{
    use HasFactory;
    protected $fillable = ['album_id', 'path', 'caption'];

    public function album(): BelongsTo
    {
        return $this->belongsTo(Album::class);
    }
}