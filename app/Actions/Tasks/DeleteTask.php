<?php

namespace App\Actions\Tasks;

use App\Models\Task;
use Illuminate\Support\Facades\DB;

class DeleteTask
{
    public function execute (Task $task)
    {
        DB::transaction(function () use ($task) {
            $column = $task->column;
            $position = $task->position;

            $column->tasks()
                ->where('position', '>', $position)
                ->decrement('position');

            $task->delete();
        });
    }
}