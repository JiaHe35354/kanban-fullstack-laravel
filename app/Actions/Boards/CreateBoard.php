<?php

namespace App\Actions\Boards;

use App\Constants\ColumnColor;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class CreateBoard 
{
   public function execute (User $user, array $data)
   {
     return DB::transaction(function () use ($user, $data) {
          $board = $user->boards()->create([
              'name' => $data['name'],
          ]);

          $board->columns()->createMany(
              collect($data['columns'])
                  ->map(fn ($name, $index) => [
                      'name' => $name,
                      'color' => ColumnColor::ALL[$index],
                  ])
                  ->all()
          );

          return $board;
      });
   }
}