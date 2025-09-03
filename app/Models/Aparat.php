<?php // File: app/Models/Aparat.php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aparat extends Model
{
    use HasFactory;
    protected $fillable = ['nama', 'jabatan', 'foto', 'urutan'];
}