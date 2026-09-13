<?php

namespace App\Actions\Boards;

use App\Constants\ColumnColor;
use App\Models\Board;
use Illuminate\Support\Facades\DB;

class SyncBoardColumns 
{
    public function execute (Board $board, array $columns): void
    {
        DB::transaction(function () use ($board, $columns) {
            $originalColumns = $board->columns()->get();

            $existingIds = $originalColumns
                ->pluck('id')
                ->map(fn ($id) => (string) $id);

            $submittedIds = collect($columns)
                ->pluck('id')
                ->filter(fn ($id) => $existingIds->contains($id));

            // Delete removed columns
            $originalColumns
                ->whereNotIn('id', $submittedIds)
                ->each(fn ($column) => $column->delete());

            // Update existing / create new columns
            foreach ($columns as $index => $columnData) {
                if ($existingIds->contains($columnData['id'])) {
                    $column = $originalColumns->firstWhere(
                        'id',
                        $columnData['id']
                    );

                    $column->update([
                        'name' => $columnData['name'],
                    ]);
                } else {
                    $board->columns()->create([
                        'name' => $columnData['name'],
                        'color' => ColumnColor::ALL[
                            $index % count(ColumnColor::ALL)
                        ],
                    ]);
                }
            }
        });
    }
}