<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'user_id' => $this->id,
            'user_name' => $this->name,
            'user_email' => $this->email,
            'created_at' => $this->created_at->format('Y-m-d H:i:s')
        ];
    }
}
