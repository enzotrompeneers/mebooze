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
  steps: number = 1;
  scale: number;
  totalLiquid: number = 200;

  peripheral: any = {};
  statusMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private ble: BLE, private ngZone: NgZone, private cocktailService: CocktailService, private scaleService: ScaleService) {
    let device = this.scaleService.getData()
    this.ble.connect(device.id).subscribe(
      peripheral => this.onConnected(peripheral),
      peripheral => console.log((peripheral))
      //peripheral => this.onDeviceDisconnected(peripheral)
    );
    this.id = this.navParams.get('id');
    this.cocktailService.getIngredientsByDrink(this.id).map(res => res.json()).subscribe(
      data => {
        this.data = data.data;
      }
    );
  }

  onConnected(peripheral) {
    this.setStatus('Connected to ' + (peripheral.name || peripheral.id));

    // check if HARDWARE is changing of value by enabling start notification
    this.ble.startNotification(peripheral.id, '6e400001-b5a3-f393-e0a9-e50e24dcca9e', '6e400003-b5a3-f393-e0a9-e50e24dcca9e').subscribe(
      data => this.onScaleChange(data),
      (error) => this.showAlert('Unexpected error', error)
    );
  }

  onScaleChange(buffer) {
    var data = new Uint8Array(buffer);
    this.ngZone.run(() => {
      this.scale = String.fromCharCode.apply(null, data);
    });
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
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

  process(steps) {
    document.getElementById('btnStep').style.visibility='hidden';

    let totalIngredients = this.data && this.data.ingredients.length;
    let text = "";
    let ingredient_amount = this.data && this.data.ingredients[steps-1].amount;
    let ingredient_unit = this.data && this.data.ingredients[steps-1].unit;
    let ingredient_name = this.data && this.data.ingredients[steps-1].name;
    
    let totalLiquid = ingredient_amount;

    console.log(steps + " " + totalIngredients);
    if(steps < totalIngredients) {
      
      this.steps++;
      text = "<h2>Step " + steps + "</h2><br>"
        + ingredient_amount + " " + ingredient_unit + " " + ingredient_name;
      

      console.log("scale is: " + this.scale + " and liquidtotal is " + totalLiquid);
      if(this.scale > totalLiquid) {
        document.getElementById('btnStep').style.visibility='show';
      }
      

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
