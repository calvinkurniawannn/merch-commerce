<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
        'account_code',
        'role',
        'phone',
        'address',
        'created_by',
        'modified_by',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'created_date' => 'datetime',
            'modified_date' => 'datetime',
        ];
    }

    // Relationship: One user has one store (if seller)
    public function store()
    {
        return $this->hasOne(Store::class);
    }
}