import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { IngredientsPage } from '../ingredients/ingredients';

import { CocktailService } from '../../services/cocktail/cocktail';

@IonicPage()
@Component({
  selector: 'page-drinks',
  templateUrl: 'drinks.html',
})
export class DrinksPage {
  data: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private cocktailService: CocktailService) {
    let id = this.navParams.get('id');
    this.cocktailService.getDrinkByCategory(id).map(res => res.json()).subscribe(
      data => {
        this.data = data.data;
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DrinksPage');
  }

  showIngredientByDrink(id) {
    this.navCtrl.push(IngredientsPage, {
      id: id
    });
  }

}
