<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCocktailsTable extends Migration {

	public function up()
	{
		Schema::create('cocktails', function(Blueprint $table) {
			$table->increments('id');
			$table->string('name', 255);
			$table->string('image', 255);
			$table->integer('categorie_id')->unsigned();
		});
	}

	public function down()
	{
		Schema::drop('cocktails');
	}
}