<?php

namespace App\Http\Controllers;

use App\Category;
use App\Cocktail;
use Response;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // show all categories
    public function index() {
        $allCategories = Category::all();
        return response::json(['data' => $allCategories]);
    }
    
    // show all cocktails by category id
    public function show($id) {
        $allCocktails = Cocktail::select('id', 'name', 'image')
            ->where('categorie_id', $id)
            ->get();
        return response::json(['data' => $allCocktails]);
    }
}
