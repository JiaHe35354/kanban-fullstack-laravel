<?php

namespace App\Http\Controllers;

use App\Actions\Tasks\CreateTask;
use App\Actions\Tasks\DeleteTask;
use App\Actions\Tasks\MoveTask;
use App\Actions\Tasks\SyncTaskSubtasks;
use App\Actions\Tasks\UpdateTask;
use App\Http\Requests\Tasks\StoreTaskRequest;
use App\Http\Requests\Tasks\UpdateTaskRequest;
use App\Http\Requests\Tasks\UpdateTaskStatusRequest;
use App\Models\Board;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    public function store (
        StoreTaskRequest $request,
        Board $board,
        CreateTask $createTask
        ): RedirectResponse
    {
        $createTask->execute(
            $board,
            $request->validated()
        );

        return redirect()
            ->route('boards.show', $board)
            ->with('success', 'Task created successfully!');;
    }

    public function update(
        UpdateTaskRequest $request,
        Board $board,
        Task $task,
        UpdateTask $updateTask
    ): RedirectResponse {
        $updateTask->execute(
            $board,
            $task,
            $request->validated()
        );

        return redirect()
            ->route('boards.show', $board)
            ->with('success', 'Task updated successfully!');
    }

    public function updateStatus(
        UpdateTaskStatusRequest $request,
        Board $board,
        Task $task,
        MoveTask $moveTask
    ): RedirectResponse {
        $validated = $request->validated();

        $newColumn = $board->columns()
            ->where('id', $validated['column_id'])
            ->firstOrFail();

        $moveTask->execute(
            $task,
            $newColumn,
            $validated['position'] ?? null
        );

        return redirect()
            ->route('boards.show', $board)
            ->with('success', 'Task status moved successfully!');
    }

    public function destroy (
        Board $board, 
        Task $task,
        DeleteTask $deleteTask
    ): RedirectResponse {
        abort_unless(
            $task->column->board_id === $board->id,
            404
        );

        $deleteTask->execute($task);

        return redirect()
            ->route('boards.show', $board)
            ->with('success', 'Task deleted successfully');
    }

    
}
