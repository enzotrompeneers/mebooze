import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';

import { ScaleService } from '../../services/scale/scale';

import { HomePage } from '../home/home';

/**
 * Generated class for the BleConnectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ble-connect',
  templateUrl: 'ble-connect.html',
})
export class BleConnectPage {

  devices: any[] = [];
  statusMessage: string;

  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    private ble: BLE,
    private ngZone: NgZone,
    private scaleService: ScaleService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BleConnectPage');
    //this.navCtrl.(false);
    this.scan();
  }

  scan() {
    this.setStatus('Scanning for Bluetooth LE Devices');
    this.devices = [];  // clear list

    this.ble.scan([], 5).subscribe(
      device => this.onDeviceDiscovered(device),
      error => this.scanError(error)
    );

    setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');
  }

  onDeviceDiscovered(device) {
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    this.ngZone.run(() => {
      this.devices.push(device);
    });
  }

  // If location permission is denied, you'll end up here
  scanError(error) {
    this.setStatus('Error ' + error);
    let toast = this.toastCtrl.create({
      message: 'Error scanning for Bluetooth low energy devices',
      position: 'middle',
      duration: 5000
    });
    toast.present();
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

  deviceSelected(device) {
    console.log(JSON.stringify(device) + ' selected');
    //this.events.publish('device', device, 2);
    this.scaleService.setData(device);
    this.navCtrl.setRoot(HomePage);
  }

}
