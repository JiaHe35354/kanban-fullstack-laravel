<?php

use App\Http\Controllers\BoardController;
use App\Http\Controllers\ColumnController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

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