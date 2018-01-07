<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Eloquent\Model;

class CreateForeignKeys extends Migration {

	public function up()
	{
		Schema::table('cocktails', function(Blueprint $table) {
			$table->foreign('categorie_id')->references('id')->on('categories')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('ingredients', function(Blueprint $table) {
			$table->foreign('cocktail_id')->references('id')->on('cocktails')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
	}

	public function down()
	{
		Schema::table('cocktails', function(Blueprint $table) {
			$table->dropForeign('cocktails_categorie_id_foreign');
		});
		Schema::table('ingredients', function(Blueprint $table) {
			$table->dropForeign('ingredients_cocktail_id_foreign');
		});
	}
}