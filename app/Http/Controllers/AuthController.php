<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Handle login request
     */
    public function login(Request $request)
    {
        // Validate the request
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
            'account_code' => 'required|string',
        ]);

        // Find the store by account_code
        $store = Store::where('account_code', $request->account_code)->first();

        if (!$store) {
            return response()->json([
                'message' => 'Store not found'
            ], 404);
        }

        // Find user by username
        $user = User::where('username', $request->username)->first();

        // Check if user exists and password is correct
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid username or password'
            ], 401);
        }

        // Check if user can access this store
        if (!$user->canAccessStore($store->id)) {
            return response()->json([
                'message' => 'You do not have access to this store'
            ], 403);
        }

        // Log the user in using Laravel session
        Auth::login($user, $request->filled('remember'));

        // Store the current store in session
        session(['current_store_id' => $store->id, 'account_code' => $store->account_code]);

        // Return user data with role
        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'username' => $user->username,
            'email' => $user->email,
            'role' => $user->role,
            'store_id' => $store->id,
            'account_code' => $store->account_code,
            'message' => 'Login successful'
        ]);
    }

    /**
     * Check if user is authenticated
     */
    public function check()
    {
        if (!Auth::check()) {
            return response()->json(['authenticated' => false], 401);
        }

        $user = Auth::user();
        $storeId = session('current_store_id');
        $accountCode = session('account_code');

        return response()->json([
            'authenticated' => true,
            'id' => $user->id,
            'name' => $user->name,
            'username' => $user->username,
            'email' => $user->email,
            'role' => $user->role,
            'store_id' => $storeId,
            'account_code' => $accountCode,
        ]);
    }

    /**
     * Handle logout request
     */
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }
}