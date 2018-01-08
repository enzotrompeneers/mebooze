import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CocktailService } from '../../services/cocktail/cocktail';

/**
 * Generated class for the IngredientsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ingredients',
  templateUrl: 'ingredients.html',
})
export class IngredientsPage {

  data: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private cocktailService: CocktailService) {
    let id = this.navParams.get('id');
    this.cocktailService.getIngredientsByDrink(id).map(res => res.json()).subscribe(
      data => {
        this.data = data;
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IngredientsPage');
  }

}
