<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Store;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Store validation endpoint - fetch store by account_code
Route::get('/stores/{account_code}', function ($account_code) {
    $store = Store::where('account_code', $account_code)->first();

    if (!$store) {
        return response()->json([
            'message' => 'Store not found'
        ], 404);
    }

    return response()->json([
        'id' => $store->id,
        'account_code' => $store->account_code,
        'store_name' => $store->store_name,
        'logo' => $store->logo,
        'theme_color' => $store->theme_color,
    ]);
});
