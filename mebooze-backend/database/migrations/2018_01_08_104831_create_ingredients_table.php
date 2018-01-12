<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateIngredientsTable extends Migration {

	public function up()
	{
		Schema::create('ingredients', function(Blueprint $table) {
			$table->increments('id');
			$table->string('amount', 255);
			$table->string('unit', 255);
			$table->integer('cocktail_id')->unsigned();
			$table->integer('product_id')->unsigned();
		});
	}

	public function down()
	{
		Schema::drop('ingredients');
	}
}