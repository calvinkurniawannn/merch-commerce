<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('stores', function (Blueprint $table) {
            $table->id();

            // Link to seller/user (CHANGED: user_id → owner_id)
            $table->foreignId('owner_id')->constrained('users')->onDelete('cascade');

            // Basic store identity
            $table->string('account_code')->unique();
            $table->string('store_name');
            $table->string('logo')->nullable();
            $table->string('theme_color')->nullable();

            // Optional info about seller
            $table->string('contact_email')->nullable();
            $table->string('contact_phone')->nullable();

            // Audit tracking
            $table->string('created_by');
            $table->timestamp('created_date')->useCurrent();
            $table->string('modified_by')->nullable();
            $table->timestamp('modified_date')->nullable();

            // Laravel timestamps
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stores');
    }
};