<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;

    protected $fillable = [
        'owner_id',
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

    // Store owner (seller)
    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    // Registered customers
    public function customers()
    {
        return $this->belongsToMany(User::class, 'customers')
                    ->withPivot('customer_code', 'is_active', 'created_by', 'created_date', 'modified_by', 'modified_date')
                    ->withTimestamps();
    }
}