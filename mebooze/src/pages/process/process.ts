import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CocktailService } from '../../services/cocktail/cocktail';

@IonicPage()
@Component({
  selector: 'page-process',
  templateUrl: 'process.html',
})
export class ProcessPage {
  data: any;
  id: number;
  steps: number = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams, private cocktailService: CocktailService) {
    this.id = this.navParams.get('id');
    this.cocktailService.getIngredientsByDrink(this.id).map(res => res.json()).subscribe(
      data => {
        this.data = data.data;
      }
    );
  }

  process(steps) {
   
    //let input = 0;
    //let totalLiquid = this.data && this.data[0].ingredient_amount;
    let totalIngredients = this.data && this.data.ingredients.length;
    let text = "";
    let ingredient_amount = this.data && this.data.ingredients[steps-1].amount;
    let ingredient_unit = this.data && this.data.ingredients[steps-1].unit;
    let ingredient_name = this.data && this.data.ingredients[steps-1].name;
    console.log(steps + " " + totalIngredients);
    if(steps < totalIngredients) {
      
      this.steps++;
      text = "<h2>Step " + steps + "</h2><br>"
        + ingredient_amount + " " + ingredient_unit + " " + ingredient_name;
      

      /*
      while(steps < totalIngredients) {
        text += "<br>Step " + steps + " ingre: " + totalLiquid;
        steps++;
        document.getElementById("steps").innerHTML = text;
      }
      */
      
    } else {
      text= "Add topping: " + ingredient_name + "<br><b>Cocktail voltooid</b>";
      document.getElementById('btnStep').style.visibility='hidden';
    }
    document.getElementById("steps").innerHTML = text;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProcessPage');
  }

}
