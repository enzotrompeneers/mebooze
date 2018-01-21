import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';

import { CocktailService } from '../../services/cocktail/cocktail';
import { ScaleService } from '../../services/scale/scale';

@IonicPage()
@Component({
  selector: 'page-process',
  templateUrl: 'process.html',
})
export class ProcessPage {
  data: any;
  id: number;
  step: number = 0;
  scale: number;
  //totalLiquid: number;
  percent: number;

  liquidAmount: number = 0;
  totalItems: number = 0;


  // scaleAmount: number;

  peripheral: any = {};
  statusMessage: string;

  weightGlass: number;

  tarValue: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private ble: BLE, private ngZone: NgZone, private cocktailService: CocktailService, private scaleService: ScaleService) {
    let device = this.scaleService.getData();
    this.ble.startNotification(device.id, '6e400001-b5a3-f393-e0a9-e50e24dcca9e', '6e400003-b5a3-f393-e0a9-e50e24dcca9e').subscribe(
      data => this.onScaleChange(data),
      (error) => this.showAlert('Unexpected error', error)
    );
    this.id = this.navParams.get('id');
    this.cocktailService.getIngredientsByDrink(this.id).map(res => res.json()).subscribe(
      data => {
        this.data = data.data;
      }
    );
  }

  onScaleChange(buffer) {
    var data = new Uint8Array(buffer);
    this.ngZone.run(() => {
      // return value minus the last scale value
      this.scale = String.fromCharCode.apply(null, data) - this.tarValue;
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

  resetTar() {
    // add current scale value to tarValue
    this.tarValue += this.scale;
  }

  process(step) {
    // reset scale
    this.resetTar();

    let text = "";
    let totalIngredients = this.data && this.data.ingredients.length;
    let ingredient_amount = this.data && this.data.ingredients[step].amount;
    let ingredient_unit = this.data && this.data.ingredients[step].unit;
    let ingredient_name = this.data && this.data.ingredients[step].name;

    this.totalItems = totalIngredients;
    this.liquidAmount = ingredient_amount;
    

    if(step < totalIngredients) {
      this.step++;

      text = "<h2>Step " + step + "</h2><br>"
        + ingredient_amount + " " + ingredient_unit + " " + ingredient_name;

    } else {
      text= "Add topping: " + ingredient_name + "<br><b>Cocktail voltooid</b>";
      document.getElementById('btnStep').style.visibility='hidden';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProcessPage');
  }

}
