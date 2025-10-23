<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'account_code',
        'store_name',
        'logo',
        'theme_color',
        'contact_email',
        'contact_phone',
        'created_by',
        'modified_by',
    ];

    protected $casts = [
        'created_date' => 'datetime',
        'modified_date' => 'datetime',
    ];

    // Relationship: Store belongs to one user (seller)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}