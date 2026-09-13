<?php

namespace App\Http\Controllers;

use App\Actions\Columns\AddBoardColumns;
use App\Models\Board;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ColumnController extends Controller
{
    public function store(
        Request $request,
        Board $board,
        AddBoardColumns $addBoardColumns
    ): RedirectResponse {
        $validated = $request->validate([
            'columns' => ['required', 'array', 'min:1'],
            'columns.*.name' => ['required', 'string', 'max:255'],
        ]);

        $existingColumnCount = $board->columns()->count();
        $newColumnCount = count($validated['columns']);

        if ($existingColumnCount + $newColumnCount > 5) {
            return back()->withErrors([
                'columns' => 'A board can have a maximum of 5 columns.',
            ]);
        }

        $addBoardColumns->execute(
            $board,
            $validated['columns']
        );

        return redirect()
            ->route('boards.show', $board)
            ->with('success', 'Columns added successfully!');
}
}
