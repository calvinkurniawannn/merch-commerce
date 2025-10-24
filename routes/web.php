<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Authentication routes
Route::post('/{account_code}/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

// Catch-all route for React app (must be last)
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');