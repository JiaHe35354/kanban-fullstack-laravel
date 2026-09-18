<?php

namespace App\Actions\Boards;

use App\Models\Board;
use Illuminate\Support\Facades\DB;

class UpdateBoard
{
    public function __construct(
      private SyncBoardColumns $syncBoardColumns,
    ) {
    }

    public function execute (Board $board, array $data): void
    {
        DB::transaction(function () use ($board, $data) {
            $board->update([
                'name' => $data['name'],
            ]);

            $this->syncBoardColumns->execute(
                $board,
                collect($data['columns'])
                    ->map(fn ($column) => [
                        'id' => $column['id'],
                        'name' => $column['name'],
                    ])
                    ->all()
            );
        });
    }
}