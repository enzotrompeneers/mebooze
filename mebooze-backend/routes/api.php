<?php

use Illuminate\Http\Request;
Use App\Cocktail;
Use App\Ingredient;
Use App\Categorie;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('cocktails', 'CocktailController@index'); // search for cocktails returns 'id', 'name' and 'image'
Route::get('cocktails/{id}', 'CocktailController@show'); // search cocktails by id returns 'cocktail_name', 'image', 'category_name', 'ingredient_name', 'ingredient_unit', 'ingredient_amount'

Route::get('categories', 'CategoryController@index'); // search for categories returns 'id', 'name'
Route::get('categories/{id}', 'CategoryController@show'); // search for cocktails by category id returns 'id', 'name' and 'image'

Route::get('ingredients/{name}', 'IngredientController@show'); // search for cocktails by ingredient name returns 'id', 'name' and 'image'