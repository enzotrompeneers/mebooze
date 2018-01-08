import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

import { CocktailService } from '../../services/cocktail/cocktail';
import { DrinksPage } from '../drinks/drinks';

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {
  data: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private cocktailService: CocktailService) {
    this.cocktailService.getCategories().map(res => res.json()).subscribe(
      data => {
        this.data = data;
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
  }

  showDrinksByCategory(id) {
    this.navCtrl.push(DrinksPage, {
      id: id
    });
  }

  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
