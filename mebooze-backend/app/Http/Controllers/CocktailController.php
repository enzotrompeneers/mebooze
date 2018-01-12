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
        return response::json(['data' => $allCocktails]);
    }
 
    public function show($id) {
        $ingredientsByCocktail = Ingredient::select('products.name', 'products.image', 'ingredients.amount', 'ingredients.unit')->where('cocktail_id', $id)->join('products', 'products.id', '=', 'ingredients.product_id')->get();
        $cocktailById = Cocktail::where('id', $id)->get()->first();

        if(count($cocktailById) == 0) {
            return response::json(['data' => 'no cocktail']);
        }

        return response::json(
            ['data' => [
                'cocktail' => $cocktailById,
                'ingredients' => $ingredientsByCocktail
            ]]
        );
    }
}
