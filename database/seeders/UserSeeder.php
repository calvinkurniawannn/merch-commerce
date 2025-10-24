<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create 2 sellers (store owners)
        User::create([
            'name' => 'John Seller',
            'username' => 'johnseller',
            'email' => 'john@seller.com',
            'password' => Hash::make('password'),
            'role' => 'seller',
            'phone' => '081234567890',
            'address' => 'Jl. Merdeka No. 123, Jakarta',
            'created_by' => 'system',
        ]);

        User::create([
            'name' => 'Sarah Shop',
            'username' => 'sarahshop',
            'email' => 'sarah@seller.com',
            'password' => Hash::make('password'),
            'role' => 'seller',
            'phone' => '081234567891',
            'address' => 'Jl. Sudirman No. 456, Bandung',
            'created_by' => 'system',
        ]);

        // Create 3 regular customers
        User::create([
            'name' => 'Alice Customer',
            'username' => 'alice',
            'email' => 'alice@customer.com',
            'password' => Hash::make('password'),
            'role' => 'user',
            'phone' => '081234567892',
            'address' => 'Jl. Asia Afrika No. 789, Surabaya',
            'created_by' => 'system',
        ]);

        User::create([
            'name' => 'Bob Buyer',
            'username' => 'bob',
            'email' => 'bob@customer.com',
            'password' => Hash::make('password'),
            'role' => 'user',
            'phone' => '081234567893',
            'address' => 'Jl. Gatot Subroto No. 321, Medan',
            'created_by' => 'system',
        ]);

        User::create([
            'name' => 'Charlie Chen',
            'username' => 'charlie',
            'email' => 'charlie@customer.com',
            'password' => Hash::make('password'),
            'role' => 'user',
            'phone' => '081234567894',
            'address' => 'Jl. Pahlawan No. 555, Semarang',
            'created_by' => 'system',
        ]);

        echo "✅ Created 5 users (2 sellers, 3 customers)\n";
    }
}