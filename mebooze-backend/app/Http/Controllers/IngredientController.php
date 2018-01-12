<?php

namespace App\Http\Controllers;

use App\Cocktail;
use App\Ingredient;
use App\Product;
use Response;

use Illuminate\Http\Request;

class IngredientController extends Controller
{
    public function show($name) {
        // all cocktails with specific ingredient
        $ingredienstByName = Product::select('cocktails.id', 'cocktails.name', 'cocktails.image')
            ->join('ingredients', 'ingredients.product_id', '=', 'products.id')
            ->join('cocktails', 'cocktails.id', '=', 'ingredients.cocktail_id')
            ->where('products.name', $name)
            ->get();

        if(count($ingredienstByName) == 0) {
            return response::json([
                'data' => 'no cocktail'
            ]);
        }

        return response::json(['data' => $ingredienstByName]);
    }
}
