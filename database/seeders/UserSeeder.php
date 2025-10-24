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
        $seller1 = User::create([
            'name' => 'John Seller',
            'email' => 'john@seller.com',
            'password' => Hash::make('password'),
            'phone' => '081234567890',
            'address' => 'Jl. Merdeka No. 123, Jakarta',
        ]);

        $seller2 = User::create([
            'name' => 'Sarah Shop Owner',
            'email' => 'sarah@seller.com',
            'password' => Hash::make('password'),
            'phone' => '081234567891',
            'address' => 'Jl. Sudirman No. 456, Bandung',
        ]);

        // Create 3 regular customers
        $customer1 = User::create([
            'name' => 'Alice Customer',
            'email' => 'alice@customer.com',
            'password' => Hash::make('password'),
            'phone' => '081234567892',
            'address' => 'Jl. Asia Afrika No. 789, Surabaya',
        ]);

        $customer2 = User::create([
            'name' => 'Bob Buyer',
            'email' => 'bob@customer.com',
            'password' => Hash::make('password'),
            'phone' => '081234567893',
            'address' => 'Jl. Gatot Subroto No. 321, Medan',
        ]);

        $customer3 = User::create([
            'name' => 'Charlie Chen',
            'email' => 'charlie@customer.com',
            'password' => Hash::make('password'),
            'phone' => '081234567894',
            'address' => 'Jl. Pahlawan No. 555, Semarang',
        ]);

        echo "✅ Created 5 users (2 sellers, 3 customers)\n";
    }
}