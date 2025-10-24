<?php

namespace Database\Seeders;

use App\Models\Store;
use App\Models\User;
use Illuminate\Database\Seeder;

class StoreSeeder extends Seeder
{
    public function run(): void
    {
        $seller1 = User::where('email', 'john@seller.com')->first();
        $seller2 = User::where('email', 'sarah@seller.com')->first();

        // Store 1 - Owned by Seller 1
        $store1 = Store::create([
            'owner_id' => $seller1->id,
            'account_code' => 'TECHSTORE',
            'store_name' => 'Tech Paradise Store',
            'logo' => 'logos/tech-store.png',
            'theme_color' => '#3B82F6',
            'contact_email' => 'contact@techparadise.com',
            'contact_phone' => '021-12345678',
            'created_by' => 'system',
        ]);

        // Store 2 - Owned by Seller 2
        $store2 = Store::create([
            'owner_id' => $seller2->id,
            'account_code' => 'FASHIONHUB',
            'store_name' => 'Fashion Hub Boutique',
            'logo' => 'logos/fashion-store.png',
            'theme_color' => '#EC4899',
            'contact_email' => 'contact@fashionhub.com',
            'contact_phone' => '022-87654321',
            'created_by' => 'system',
        ]);

        // Get customers
        $alice = User::where('email', 'alice@customer.com')->first();
        $bob = User::where('email', 'bob@customer.com')->first();
        $charlie = User::where('email', 'charlie@customer.com')->first();

        // Alice registers in both stores
        $alice->registeredStores()->attach($store1->id, [
            'customer_code' => 'TECHSTORE-CUST001',
            'is_active' => true,
            'created_by' => 'system',
            'created_date' => now(),
        ]);
        
        $alice->registeredStores()->attach($store2->id, [
            'customer_code' => 'FASHIONHUB-CUST001',
            'is_active' => true,
            'created_by' => 'system',
            'created_date' => now(),
        ]);

        // Bob registers only in Tech Store
        $bob->registeredStores()->attach($store1->id, [
            'customer_code' => 'TECHSTORE-CUST002',
            'is_active' => true,
            'created_by' => 'system',
            'created_date' => now(),
        ]);

        // Charlie registers only in Fashion Hub
        $charlie->registeredStores()->attach($store2->id, [
            'customer_code' => 'FASHIONHUB-CUST002',
            'is_active' => true,
            'created_by' => 'system',
            'created_date' => now(),
        ]);

        echo "✅ Created 2 stores with customer registrations\n";
        echo "   - Tech Paradise Store (TECHSTORE): 2 customers\n";
        echo "   - Fashion Hub Boutique (FASHIONHUB): 2 customers\n";
    }
}