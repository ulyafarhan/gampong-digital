<?php // app/Models/Album.php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany; // <-- Impor ini

class Album extends Model
{
    use HasFactory;
    protected $fillable = ['judul', 'deskripsi'];

    public function fotos(): HasMany
    {
        return $this->hasMany(Foto::class);
    }
}