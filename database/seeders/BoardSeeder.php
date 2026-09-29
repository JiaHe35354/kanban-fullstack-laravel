<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class BoardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = json_decode(
            File::get(database_path('seeders/data.json')),
            true,
        );

        $user = User::where('email', 'test@example.com')->firstOrFail();

        foreach ($data['boards'] as $boardData) {
            $board = $user->boards()->firstOrCreate([
                'name' => $boardData['name'],
            ]);

            foreach ($boardData['columns'] as $columnData) {
                $column = $board->columns()->firstOrCreate([
                    'name' => $columnData['name'],
                    'color' => $columnData['color'],
                ]);

                foreach ($columnData['tasks'] as $index => $taskData) {
                    $task = $column->tasks()->firstOrCreate([
                        'title' => $taskData['title'],
                        'description' => $taskData['description'],
                        'position' => $index,
                    ]);

                    foreach ($taskData['subtasks'] as $subtaskData) {
                        $task->subtasks()->firstOrCreate([
                            'title' => $subtaskData['title'],
                            'is_completed' => $subtaskData['isCompleted'],
                        ]);
                    }
                }
            }
        }
    }
}
