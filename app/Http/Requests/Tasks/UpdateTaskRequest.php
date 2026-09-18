<?php

namespace App\Http\Requests\Tasks;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->task->column->board_id === $this->board->id;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'title' => trim($this->title),
            'description' => trim($this->description),
            'subtasks' => collect($this->subtasks)
                ->map(fn ($subtask) => [
                    'id' => $subtask['id'],
                    'title' => trim($subtask['title']),
                ])
                ->all(),
        ]);
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],

            'description' => ['nullable', 'string'],

            'column_id' => [
                'required',
                'integer',
                Rule::exists('columns', 'id')
                    ->where('board_id', $this->board->id),
            ],

            'subtasks' => ['required', 'array', 'min:1', 'max:10'],

            'subtasks.*.id' => ['required', 'string'],

            'subtasks.*.title' => [
                'required',
                'string',
                'max:255',
            ],
        ];
    }
}
