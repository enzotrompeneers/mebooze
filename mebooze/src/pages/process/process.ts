import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';

import { CocktailService } from '../../services/cocktail/cocktail';
import { ScaleService } from '../../services/scale/scale';
import { HomePage } from '../home/home';

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
  percent: number;


  totalItems: number = 0;
  amount: number = 0;
  unit: string;
  name: string;

  peripheral: any = {};
  statusMessage: string;

  weightGlass: number;

  tarValue: number = 0;
  isConnected: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private ble: BLE, private ngZone: NgZone, private cocktailService: CocktailService, private scaleService: ScaleService) {
    let device = this.scaleService.getData();
    this.ble.startNotification(device.id, '6e400001-b5a3-f393-e0a9-e50e24dcca9e', '6e400003-b5a3-f393-e0a9-e50e24dcca9e').subscribe(
      data => this.onScaleChange(data),
      (error) => this.showAlert('No Bluetooth Connection', 'You need to connect with the scale.')
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
    // reset the tar
    this.resetTar();

    // next step
    this.step++;

    // set all ingredients of specific step
    this.totalItems = this.data && this.data.ingredients.length;
    this.amount = this.data && this.data.ingredients[step].amount;
    this.unit = this.data && this.data.ingredients[step].unit;
    this.name = this.data && this.data.ingredients[step].name;
  }

  toHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProcessPage');
  }

}