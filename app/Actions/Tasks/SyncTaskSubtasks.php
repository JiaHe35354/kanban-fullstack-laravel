<?php

namespace App\Actions\Tasks;

use App\Models\Task;
use Illuminate\Support\Facades\DB;

class SyncTaskSubtasks
{
    public function execute(Task $task, array $subtasks): void
    {
        DB::transaction(function () use ($task, $subtasks) {
            $originalSubtasks = $task->subtasks()->get();

            $existingIds = $originalSubtasks
                ->pluck('id')
                ->map(fn ($id) => (string) $id);

            $submittedExistingIds = collect($subtasks)
                ->pluck('id')
                ->filter(fn ($id) => $existingIds->contains($id));

            // Delete removed subtasks
            $originalSubtasks
                ->whereNotIn('id', $submittedExistingIds)
                ->each(fn ($subtask) => $subtask->delete());

            // Update existing / create new subtasks
            foreach ($subtasks as $subtaskData) {
                if ($existingIds->contains($subtaskData['id'])) {
                    $subtask = $originalSubtasks->firstWhere(
                        'id',
                        $subtaskData['id']
                    );

                    $subtask->update([
                        'title' => $subtaskData['title'],
                    ]);
                } else {
                    $task->subtasks()->create([
                        'title' => $subtaskData['title'],
                        'is_completed' => false,
                    ]);
                }
            }
        });
    }
}