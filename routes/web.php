<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {

    Route::controller(AuthenticationController::class)
        ->group(function () {
            Route::get('/', 'index')->name('auth.index');
            Route::post('/login', 'login')->name('auth.login');
        });

    Route::controller(ChatController::class)
        ->group(function () {
            Route::post('/send', 'send')->name('chat.send');
        });
});

Route::middleware('auth')->group(function () {
    Route::controller('/logout', AuthenticationController::class, 'destroy')
        ->name('auth.destroy');
});
