<?php

namespace App\Actions\Tasks;

use App\Models\Board;
use App\Models\Task;
use Illuminate\Support\Facades\DB;

class UpdateTask
{
  public function __construct(
    private MoveTask $moveTask,
    private SyncTaskSubtasks $syncTaskSubtasks,
  )
  {
  }

  public function execute(
    Board $board,
    Task $task,
    array $data
  ): void {
        DB::transaction(function () use ($board, $task, $data) {
            $newColumn = $board->columns()
                ->where('id', $data['column_id'])
                ->firstOrFail();

            $this->moveTask->execute($task, $newColumn);

            $task->update([
                'title' => $data['title'],
                'description' => $data['description'],
            ]);

            $this->syncTaskSubtasks->execute(
                $task,
                collect($data['subtasks'])
                    ->map(fn ($subtask) => [
                        'id' => (string) $subtask['id'],
                        'title' => $subtask['title'],
                    ])
                    ->all()
            );
        });

  }
}