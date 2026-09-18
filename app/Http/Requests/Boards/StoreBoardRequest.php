<?php

namespace App\Http\Requests\Boards;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBoardRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation():void
    {
        $this->merge([
            'name' => strtolower(trim($this->name)),
            'columns' => collect($this->columns)
                ->map(fn ($column) => trim($column))
                ->all()
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
                    ->where('user_id', $this->user()->id),
            ],
            'columns' => ['required', 'array', 'min:1', 'max:5'],
            'columns.*' => ['required', 'string', 'max:255'],
        ];
    }
}
