<?php

namespace Database\Seeders;

use App\Models\Store;
use App\Models\User;
use Illuminate\Database\Seeder;

class StoreSeeder extends Seeder
{
    public function run(): void
    {
        // Get the sellers we created
        $seller1 = User::where('email', 'john@seller.com')->first();
        $seller2 = User::where('email', 'sarah@seller.com')->first();

        // Create Store 1 - Tech Store
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

        // Register seller1 as seller in their own store
        $seller1->stores()->attach($store1->id, [
            'username' => 'johnseller',
            'account_code' => 'TECHSTORE-SELLER001',
            'role' => 'seller',
            'is_active' => true,
            'registered_at' => now(),
            'registered_by' => 'system',
        ]);

        // Create Store 2 - Fashion Store
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

        // Register seller2 as seller in their own store
        $seller2->stores()->attach($store2->id, [
            'username' => 'sarahshop',
            'account_code' => 'FASHIONHUB-SELLER001',
            'role' => 'seller',
            'is_active' => true,
            'registered_at' => now(),
            'registered_by' => 'system',
        ]);

        // Register customers in Store 1 (Tech Store)
        $customer1 = User::where('email', 'alice@customer.com')->first();
        $customer2 = User::where('email', 'bob@customer.com')->first();
        $customer3 = User::where('email', 'charlie@customer.com')->first();

        $customer1->stores()->attach($store1->id, [
            'username' => 'alice_tech',
            'account_code' => 'TECHSTORE-CUST001',
            'role' => 'customer',
            'is_active' => true,
            'registered_at' => now(),
            'registered_by' => 'system',
        ]);

        $customer2->stores()->attach($store1->id, [
            'username' => 'bob_tech',
            'account_code' => 'TECHSTORE-CUST002',
            'role' => 'customer',
            'is_active' => true,
            'registered_at' => now(),
            'registered_by' => 'system',
        ]);

        // Register customers in Store 2 (Fashion Store)
        $customer1->stores()->attach($store2->id, [
            'username' => 'alice_fashion',
            'account_code' => 'FASHIONHUB-CUST001',
            'role' => 'customer',
            'is_active' => true,
            'registered_at' => now(),
            'registered_by' => 'system',
        ]);

        $customer3->stores()->attach($store2->id, [
            'username' => 'charlie_fashion',
            'account_code' => 'FASHIONHUB-CUST002',
            'role' => 'customer',
            'is_active' => true,
            'registered_at' => now(),
            'registered_by' => 'system',
        ]);

        echo "✅ Created 2 stores with customers registered\n";
        echo "   - Tech Paradise Store (TECHSTORE): 2 customers\n";
        echo "   - Fashion Hub Boutique (FASHIONHUB): 2 customers\n";
    }
}