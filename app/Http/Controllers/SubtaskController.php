<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Models\Subtask;
use Illuminate\Http\RedirectResponse;

class SubtaskController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Board $board, Subtask $subtask): RedirectResponse
    {
        abort_unless(
            $subtask->task->column->board_id === $board->id,
            404
        );

        $subtask->update([
            'is_completed' => ! $subtask->is_completed,
        ]);

        return back();
    }
}
