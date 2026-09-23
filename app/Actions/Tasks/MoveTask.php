<?php

namespace App\Actions\Tasks;

use App\Models\Column;
use App\Models\Task;
use Illuminate\Support\Facades\DB;

class MoveTask
{
    public function execute(
        Task $task, 
        Column $newColumn,
        ?int $newPosition = null
    ): void {
        DB::transaction(function () use ($task, $newColumn, $newPosition) {
            $oldColumn = $task->column;

            if ($newPosition === null) {
                $newPosition = $newColumn->tasks()
                    ->whereKeyNot($task->id)
                    ->count();
            }

            if ($oldColumn->id === $newColumn->id) {
                $this->moveWithinColumn($task, $newPosition);

                return;
            }

            $this->moveBetweenColumns(
                $task,
                $oldColumn,
                $newColumn,
                $newPosition
            );
        });
    }

    private function moveWithinColumn (
        Task $task,
        ?int $newPosition = null
    ): void {
        $oldPosition = $task->position;

        if ($oldPosition === $newPosition) return;

        if ($newPosition > $oldPosition) {
            $task->column
                ->tasks()
                ->whereKeyNot($task->id)
                ->whereBetween('position', [
                    $oldPosition + 1,
                    $newPosition,
                ])
                ->decrement('position');
        } else {
            $task->column
                ->tasks()
                ->whereKeyNot($task->id)
                ->whereBetween('position', [
                    $newPosition,
                    $oldPosition - 1,
                ])
                ->increment('position');
        }

        $task->update([
            'position' => $newPosition,
        ]);
    }

    private function moveBetweenColumns (
        Task $task,
        Column $oldColumn,
        Column $newColumn,
        ?int $newPosition = null
    ): void {
        $oldColumn
            ->tasks()
            ->whereKeyNot($task->id)
            ->where('position', '>', $task->position)
            ->decrement('position');

        $newColumn
            ->tasks()
            ->where('position', '>=', $newPosition)
            ->increment('position');

        $task->update([
            'column_id' => $newColumn->id,
            'position' => $newPosition,
        ]);
    }
}