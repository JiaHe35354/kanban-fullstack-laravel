<?php

namespace App\Http\Requests\Boards;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Override;

class UpdateBoardRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('workWith', $this->board);
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'name' => strtolower(trim($this->name)),
            'columns' => collect($this->columns)
                ->map(fn ($column) => [
                    'id' => $column['id'],
                    'name' => trim($column['name']),
                ])
                ->all(),
        ]);
    }

    public function rules(): array
    {
        return [
            'name' => [
                'required', 
                'string', 
                'max:255', 
                Rule::unique('boards', 'name')
                    ->where('user_id', $this->user()->id)
                    ->ignore($this->board->id),
            ],
            'columns' => ['required', 'array', 'min:1', 'max:5'],
            'columns.*.id' => ['required', 'string'],
            'columns.*.name' => ['required', 'string', 'max:255'],

        ];
    }
}
