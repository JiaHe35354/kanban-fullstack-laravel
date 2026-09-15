<?php

namespace App\Http\Controllers;

use App\Actions\Boards\SyncBoardColumns;
use App\Constants\ColumnColor;
use App\Models\Board;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class BoardController extends Controller
{
    public function index (Request $request): Response|RedirectResponse
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

    public function store (Request $request): RedirectResponse
    {
        $request->merge([
            'name' => strtolower(trim($request->name)),
            'columns' => collect($request->columns)
                ->map(fn ($column) => trim($column))
                ->all()
        ]);

        $validated = $request->validate([
            'name' => [
                'required', 
                'string', 
                'max:255', 
                Rule::unique('boards', 'name')
                    ->where('user_id', $request->user()->id),
            ],
            'columns' => ['required', 'array', 'min:1', 'max:5'],
            'columns.*' => ['required', 'string', 'max:255'],
        ]);

        $board = DB::transaction(function () use ($request, $validated){
            $board = $request->user()->boards()->create([
                'name' => $validated['name'],
            ]);

            $colors = ColumnColor::ALL;
            
            $board->columns()->createMany(
                collect($validated['columns'])
                    ->map(fn ($name, $index) => [
                        'name' => trim($name),
                        'color' => $colors[$index]
                    ])
                    ->all()
            );

            return $board;
        });

        return redirect()->route('boards.show', $board)->with('success', 'Board created successfully!');;
    }

    public function update (
        Request $request, 
        Board $board, 
        SyncBoardColumns $syncBoardColumns
    ): RedirectResponse {
        Gate::authorize('workWith', $board);

        $validated = $request->validate([
            'name' => [
                'required', 
                'string', 
                'max:255', 
            Rule::unique('boards', 'name')
                ->where('user_id', $request->user()->id)
                ->ignore($board->id),
            ],
            'columns' => ['required', 'array', 'min:1', 'max:5'],
            'columns.*.id' => ['required', 'string'],
            'columns.*.name' => ['required', 'string', 'max:255'],
        ]);

        $board->update([
            'name' => strtolower(trim ($validated['name'])),
        ]);

        $syncBoardColumns->execute(
            $board,
            collect($validated['columns'])
                ->map(fn ($column) => [
                    'id' => (string) $column['id'],
                    'name' => trim($column['name']),
                ])
                ->all()
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
