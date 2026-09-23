<?php

namespace App\Http\Controllers;

use App\Actions\Boards\CreateBoard;
use App\Actions\Boards\UpdateBoard;
use App\Http\Requests\Boards\StoreBoardRequest;
use App\Http\Requests\Boards\UpdateBoardRequest;
use App\Models\Board;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class BoardController extends Controller
{
    public function index (Request $request): Response | RedirectResponse
    {
        $firstBoard = $request->user()->boards()->first();
        
        if ($firstBoard) {
            return redirect()->route('boards.show', $firstBoard->id);
        }

        return Inertia::render('boards/show', [
            'boards' => [],
            'activeBoard' => null
        ]);
    }

    public function show (Board $board): Response
    {
        Gate::authorize('workWith', $board);

        $board->load('columns.tasks.subtasks');

        return Inertia::render('boards/show', [
            'activeBoard' => $board
        ]);
    }

    public function store (
        StoreBoardRequest $request,
        CreateBoard $createBoard
    ): RedirectResponse
    {
        $board = $createBoard->execute(
            $request->user(),
            $request->validated()
        );
       
        return redirect()
            ->route('boards.show', $board)
            ->with('success', 'Board created successfully!');
    }

    public function update (
        UpdateBoardRequest $request, 
        Board $board, 
        UpdateBoard $updateBoard
    ): RedirectResponse {
        $updateBoard->execute(
            $board,
            $request->validated()
        );

        return redirect()
            ->route('boards.show', $board)
            ->with('success', 'Board updated successfully!');
    }

    public function destroy (Board $board): RedirectResponse
    {
        Gate::authorize('workWith', $board);

        $board->delete();

        return redirect()->route('boards.index')->with('success', 'Board deleted successfully!');
    }
}
