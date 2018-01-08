<?php

namespace App\Http\Controllers;

use App\Cocktail;
use App\Ingredient;
use App\Http\Resources\CocktailCollection;

use Illuminate\Http\Request;
use Response;

class CocktailController extends Controller
{

    // all cocktails with id and name for search purpose
    public function index() {
        $allCocktails = Cocktail::select('id', 'name', 'image')->get();
        return response::json($allCocktails);
    }
 
    public function show($id) {
        $showCocktail = Cocktail::select(
            'cocktails.name as cocktail_name', 
            'cocktails.image', 
            'categories.name as category_name',
            'ingredients.name as ingredient_name',
            'ingredients.unit as ingredient_unit',
            'ingredients.amount as ingredient_amount',
            'ingredients.image as ingredient-image'
            )
                ->join('categories', 'categories.id', '=', 'cocktails.id')
                ->join('ingredients', 'ingredients.cocktail_id', '=', 'cocktails.id')
                ->where('cocktails.id', $id)
                ->get();
        return response::json($showCocktail);

        
    }
}
