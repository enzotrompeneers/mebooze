@extends('layouts.master')

@section('content')
    <header>
		<div class="grid-container text-center">
			<h1>MeBooze</h1>
		</div>
	</header>

    <div class="grid-container text-center">
        <div class="grid-x grid-margin-x grid-margin-y grid-padding-x grid-padding-y"> 
			<div class="cell medium-6 large-4">
				<b>Groot scherm</b><br>
				kolomgrootte: 4 <br>
				Foundation grid: 12 <br>
				4 / 12 = 3 <br>
				3 kolommen per rij
			</div>

			<div class="cell medium-6 large-4">
				<b>Middelmatig scherm</b><br>
				kolomgrootte: 6 <br>
				Foundation grid: 12 <br>
				6 / 12 = 2 <br>
				2 kolommen per rij
			</div>

			<div class="cell medium-6 large-4">
				<b>Klein scherm</b><br>
				kolomgrootte: 12 <br>
				Foundation grid: 12 <br>
				12 / 12 = 1 <br>
				1 kolom per rij
			</div>
		</div>
    </div>

    <footer>
		<div class="grid-container text-center">
			<h1>MeBooze</h1>
		</div>
	</footer>
@stop