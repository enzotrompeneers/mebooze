import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CocktailService } from '../../services/cocktail/cocktail';

/**
 * Generated class for the ProcessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-process',
  templateUrl: 'process.html',
})
export class ProcessPage {
  data: any;
  id: number;
  steps: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private cocktailService: CocktailService) {
    let id = this.navParams.get('id');
    this.id = id;

    this.cocktailService.getIngredientsByDrink(id).map(res => res.json()).subscribe(
      data => {
        this.data = data;
      }
    );
  }

  process(steps) {
    console.log(steps);
    //let input = 0;
    //let totalLiquid = this.data && this.data[0].ingredient_amount;
    //let totalIngredients = this.data && this.data.length;
    let text = "";

    let ingredient_amount = this.data && this.data[steps].ingredient_amount;
    let ingredient_unit = this.data && this.data[steps].ingredient_unit;
    let ingredient_name = this.data && this.data[steps].ingredient_name;
    this.steps++;
    text = "<h2>Step " + steps + "</h2><br>"
          + ingredient_amount + " " + ingredient_unit + " " + ingredient_name;
    document.getElementById("steps").innerHTML = text;
    
    /*
    while(steps < totalIngredients) {
      text += "<br>Step " + steps + " ingre: " + totalLiquid;
      steps++;
      document.getElementById("steps").innerHTML = text;
    }
    */
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProcessPage');
  }

}
