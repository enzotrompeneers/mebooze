<?php

use App\Http\Resources\Cocktail as CocktailResource;
use App\Http\Resources\CocktailCollection;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/json', 'CocktailController@show')->name('cocktail.show');