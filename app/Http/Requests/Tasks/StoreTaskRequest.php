<?php

namespace App\Http\Requests\Tasks;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Override;

class StoreTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'title' => trim($this->title),
            'description' => trim($this->description),
            'subtasks' => collect($this->subtasks)
                ->map(fn ($subtask) => trim($subtask))
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
                    ->where('board_id', $this->board->id)
            ],
            'subtasks' => ['required', 'array', 'min:1', 'max:10'],
            'subtasks.*' => ['required', 'string', 'max:255'],
            
        ];
    }
}
