<?php

namespace App\Http\Controllers;

use App\Models\Board;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BoardController extends Controller
{
    public function index ()
    {
        $firstBoard = Board::first();
        
        if ($firstBoard) {
            return redirect()->route('boards.show', $firstBoard->id);
        }

        return Inertia::render('boards/show', [
            'boards' => [],
            'activeBoard' => null
        ]);
    }

    public function show(Board $board)
    {

        $board->load('columns.tasks.subtasks');

        return Inertia::render('boards/show', [
            'activeBoard' => $board
        ]);
    }
}
