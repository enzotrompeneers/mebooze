<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class Cocktail extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return parent::toArray($request); // all

        /*
        return [
            'name' => $this->name,
            'image' => $this->image,
        ];
        */
        
    }

    /*
    public function with($request) {
        return [
            'version' => '1.0.0',
        ];
    }
    */
}
