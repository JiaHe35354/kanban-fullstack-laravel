<?php

namespace App\Policies;

use App\Models\Board;
use App\Models\User;

class BoardPolicy
{
    public function workWith (User $user, Board $board): bool
    {
        return $board->user->is($user);
    }
}
