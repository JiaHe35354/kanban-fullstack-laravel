<?php

namespace App\Http\Controllers;

use App\Actions\Tasks\MoveTask;
use App\Actions\Tasks\SyncTaskSubtasks;
use App\Models\Board;
use App\Models\Column;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    public function store (Request $request, Board $board): RedirectResponse
    {
        $request->merge([
            'title' => trim($request->title),
            'description' => trim($request->description),
            'subtasks' => collect($request->subtasks)
                ->map(fn ($subtask) => trim($subtask))
                ->all(),
        ]);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'column_id' => ['required', 'integer', 'exists:columns,id'],
            'subtasks' => ['required', 'array', 'min:1', 'max:10'],
            'subtasks.*' => ['required', 'string', 'max:255'],
        ]);

        DB::transaction(function () use ($board, $validated) {
            $column = $board->columns()
                ->where('id', $validated['column_id'])
                ->firstOrFail();

            $position = $column->tasks()->max('position');

            $task = $column->tasks()->create([
                'title' => $validated['title'],
                'description' => $validated['description'],
                'position' => $position === null ? 0 : $position + 1,
            ]);

            $task->subtasks()->createMany(
                collect($validated['subtasks'])
                    ->map(fn ($title) => [
                        'title' => $title,
                        'is_completed' => false,
                    ])
                    ->all()
            );
        });

        return redirect()->route('boards.show', $board)->with('success', 'Task created successfully!');;
    }

    public function update(
        Request $request,
        Board $board,
        Task $task,
        MoveTask $moveTask,
        SyncTaskSubtasks $syncTaskSubtasks
    ): RedirectResponse {
        // Make sure the task belongs to this board
        abort_unless(
            $task->column->board_id === $board->id,
            404
        );

        $request->merge([
            'title' => trim($request->title),
            'description' => trim($request->description),
            'subtasks' => collect($request->subtasks)
                ->map(fn ($subtask) => [
                    'id' => $subtask['id'],
                    'title' => trim($subtask['title']),
                ])
                ->all(),
        ]);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'column_id' => ['required', 'integer', 'exists:columns,id'],
            'subtasks' => ['required', 'array', 'min:1', 'max:10'],
            'subtasks.*.id' => ['required', 'string'],
            'subtasks.*.title' => ['required', 'string', 'max:255'],
        ]);

        DB::transaction(function () use (
            $board,
            $task,
            $validated,
            $moveTask,
            $syncTaskSubtasks
        ) {
            $newColumn = $board->columns()
                ->where('id', $validated['column_id'])
                ->firstOrFail();

            $moveTask->execute($task, $newColumn);

            $task->update([
                'title' => $validated['title'],
                'description' => $validated['description'],
            ]);

            $syncTaskSubtasks->execute(
                $task,
                collect($validated['subtasks'])
                    ->map(fn ($subtask) => [
                        'id' => (string) $subtask['id'],
                        'title' => trim($subtask['title']),
                    ])
                    ->all()
            );
        });

        return redirect()->route('boards.show', $board)->with('success', 'Task updated successfully!');
    }

    public function updateStatus(
        Request $request,
        Board $board,
        Task $task,
        MoveTask $moveTask
    ): RedirectResponse {
        abort_unless(
            $task->column->board_id === $board->id,
            404
        );

        $validated = $request->validate([
            'column_id' => ['required', 'integer', 'exists:columns,id'],
        ]);

        DB::transaction(function () use ($board, $task, $validated, $moveTask) {
            $newColumn = $board->columns()
                ->where('id', $validated['column_id'])
                ->firstOrFail();

            $moveTask->execute($task, $newColumn);
        });

        return redirect()
            ->route('boards.show', $board);
    }

    public function destroy (Board $board, Task $task): RedirectResponse
    {
        abort_unless(
            $task->column->board_id === $board->id,
            404
        );

        DB::transaction(function () use ($task) {
            $column = $task->column;
            $position = $task->position;

            $column->tasks()
                ->where('position', '>', $position)
                ->decrement('position');

            $task->delete();
        });

        return redirect()->route('boards.show', $board)->with('success', 'Task deleted successfully');
    }
}
