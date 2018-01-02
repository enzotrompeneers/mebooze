<?php
namespace App\Http\Resources;
namespace App;

use Illuminate\Database\Eloquent\Model;

class Cocktail extends Model
{
    protected $table = 'cocktails';
    public $timestamps = false;

    protected $fillable = [
        'name', 'image',
    ];

    
    public function Ingredient()
    {
        return $this->hasMany('Ingredient', 'categorie_id');
    }
}
