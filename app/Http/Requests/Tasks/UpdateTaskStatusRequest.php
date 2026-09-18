<?php

namespace App\Http\Requests\Tasks;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTaskStatusRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->task->column->board_id === $this->board->id;
    }

    public function rules(): array
    {
        return [
            'column_id' => [
                'required',
                'integer',
                Rule::exists('columns', 'id')
                    ->where('board_id', $this->board->id),
            ],
        ];
    }
}
