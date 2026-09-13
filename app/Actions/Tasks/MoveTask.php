<?php

namespace App\Actions\Tasks;

use App\Models\Column;
use App\Models\Task;

class MoveTask
{
    public function execute(Task $task, Column $newColumn): void
    {
        $oldColumn = $task->column;

        if ($oldColumn->id === $newColumn->id) {
            return;
        }

        $oldTasks = $oldColumn->tasks()
            ->whereKeyNot($task->id)
            ->orderBy('position')
            ->get();

        foreach ($oldTasks as $index => $oldTask) {
            $oldTask->update([
                'position' => $index,
            ]);
        }

        $newPosition = $newColumn->tasks()->count();

        $task->update([
            'column_id' => $newColumn->id,
            'position' => $newPosition,
        ]);
    }
}