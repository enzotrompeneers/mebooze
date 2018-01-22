import { Component } from '@angular/core';
import { BLE } from '@ionic-native/ble';
import { NavController, AlertController } from 'ionic-angular';

import { ScaleService } from '../../services/scale/scale';

import { BleConnectPage } from '../../pages/ble-connect/ble-connect';
import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  connected: boolean = false;
  peripheral: any = {};

  constructor(private scaleService: ScaleService, private ble: BLE, public navCtrl: NavController, private alertCtrl: AlertController) {
    let device = this.scaleService.getData();
    this.ble.connect(device.id).subscribe(
      peripheral => this.onConnected(peripheral),
      peripheral => console.log((peripheral))
    );
  }

  onConnected(peripheral) {
    this.connected = true;
    this.peripheral = peripheral;
  }

  connection() {
    // check connected
    if(!this.connected) {
      this.navCtrl.setRoot(BleConnectPage);
    }

    if(this.connected) {
      this.disconnect();
    }
  }

  disconnect() {
    this.ble.disconnect(this.peripheral.id).then(
      () => this.showAlert('ERROR', 'disconnected'),
      () => this.showAlert('ERROR', 'not disconnected')
    );
    this.connected = false;
    // It doens't work for android. Fucking DON
  }

  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  toHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

}
