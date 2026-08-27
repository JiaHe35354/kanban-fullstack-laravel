<?php

namespace App\Http\Controllers;

use App\Models\Board;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BoardController extends Controller
{
    public function index ()
    {
        $boards = Board::with([
            'columns.tasks.subtasks',
        ])->get();

        return Inertia::render('boards/index', [
            'boards' => $boards,
        ]);
    }
}
