<?php

namespace App\Actions\Tasks;

use App\Models\Board;
use App\Models\Task;
use Illuminate\Support\Facades\DB;

class CreateTask 
{
    public function execute (Board $board, array $data): Task
    {
      return DB::transaction(function () use ($board, $data) {
          $column = $board->columns()
              ->where('id', $data['column_id'])
              ->firstOrFail();

          $position = $column->tasks()->max('position');

          $task = $column->tasks()->create([
              'title' => $data['title'],
              'description' => $data['description'],
              'position' => $position === null ? 0 : $position + 1,
          ]);

          $task->subtasks()->createMany(
              collect($data['subtasks'])
                  ->map(fn ($title) => [
                      'title' => $title,
                      'is_completed' => false,
                  ])
                  ->all()
          );

          return $task;
      });
    }
}