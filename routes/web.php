<?php

use App\Http\Controllers\BoardController;
use App\Http\Controllers\ColumnController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\SubtaskController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/boards');

Route::middleware('auth')->group(function () {
    Route::get('/boards', [BoardController::class, 'index'])->name('boards.index');
    Route::get('/boards/{board}', [BoardController::class, 'show'])->name('boards.show');

    Route::post('/boards', [BoardController::class, 'store'])->name('boards.store');
    Route::put('/boards/{board}', [BoardController::class, 'update'])->name('boards.update');
    Route::delete('/boards/{board}', [BoardController::class, 'destroy'])->name('boards.destroy');

    Route::post('/boards/{board}/columns', [ColumnController::class, 'store'])->name('columns.store');

    Route::post('/boards/{board}/tasks', [TaskController::class, 'store'])->name('tasks.store');
    Route::put('/boards/{board}/tasks/{task}', [TaskController::class, 'update'])->name('tasks.update');
    Route::patch(
      '/boards/{board}/tasks/{task}/status', 
      [TaskController::class, 'updateStatus']
    )->name('tasks.update-status');
    Route::delete('/boards/{board}/tasks/{task}', [TaskController::class, 'destroy'])->name('tasks.destroy');

    Route::post('/boards/{board}/subtasks/{subtask}/toggle', SubtaskController::class)->name('subtasks.toggle');

    Route::post('/auth/logout', [LoginController::class, 'destroy']);

});

Route::middleware('guest')->group(function () {
    Route::get('/register', [RegisterController::class, 'create']);
    Route::post('/register', [RegisterController::class, 'store']);

    Route::get('/login', [LoginController::class, 'create'])->name('login');
    Route::post('/login', [LoginController::class, 'store']);

    Route::post('/auth/demo', [LoginController::class, 'demo'])->name('login.demo');
});
