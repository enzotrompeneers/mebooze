<?php

namespace App\Http\Controllers;

use App\Cocktail;
use App\Ingredient;
use Response;

use Illuminate\Http\Request;

class IngredientController extends Controller
{
    public function show($name) {
        // all cocktails with specific ingredient
        $allCocktailsID = Cocktail::select('cocktails.id', 'cocktails.name', 'cocktails.image')
            ->where('ingredients.name', $name)
            ->orWhere('ingredients.name', 'like', '%' . $name . '%')
            ->distinct('pid')
            ->join('ingredients', 'ingredients.cocktail_id', '=', 'cocktails.id')
            ->get();

        return response::json($allCocktailsID);

       
    }
}
