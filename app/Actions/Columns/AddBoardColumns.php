<?php

namespace App\Actions\Columns;

use App\Constants\ColumnColor;
use App\Models\Board;
use Illuminate\Support\Facades\DB;

class AddBoardColumns
{
    public function execute(Board $board, array $columns): void
    {
        DB::transaction(function () use ($board, $columns) {
            $existingColumnCount = $board->columns()->count();

            foreach ($columns as $index => $columnData) {
                $board->columns()->create([
                    'name' => trim($columnData['name']),
                    'color' => ColumnColor::ALL[
                        ($existingColumnCount + $index)
                        % count(ColumnColor::ALL)
                    ],
                ]);
            }
        });
    }
}