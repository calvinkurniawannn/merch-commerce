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
            'password' => 'hashed',
            'created_date' => 'datetime',
            'modified_date' => 'datetime',
        ];
    }

    // For SELLERS: One seller owns one store
    public function ownedStore()
    {
        return $this->hasOne(Store::class, 'owner_id');
    }

    // For USERS: Many users can register in many stores
    public function registeredStores()
    {
        return $this->belongsToMany(Store::class, 'customers')
                    ->withPivot('customer_code', 'is_active', 'created_by', 'created_date', 'modified_by', 'modified_date')
                    ->withTimestamps();
    }

    // Check if user can access a specific store
    public function canAccessStore($storeId)
    {
        if ($this->role === 'seller') {
            return $this->ownedStore && $this->ownedStore->id === $storeId;
        }
        
        return $this->registeredStores()->where('store_id', $storeId)->where('is_active', true)->exists();
    }
}