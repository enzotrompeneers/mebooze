import { Component, NgZone } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';


import { ScaleService } from '../../services/scale/scale';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  peripheral: any = {};
  data: any = [];
  statusMessage: string;
  scale: number;

  constructor(public navCtrl: NavController, private ble: BLE, private alertCtrl: AlertController, private ngZone: NgZone, private scaleService: ScaleService) { 
    let device = this.scaleService.getData()
    this.ble.connect(device.id).subscribe(
      peripheral => this.onConnected(peripheral),
      peripheral => console.log((peripheral))
      //peripheral => this.onDeviceDisconnected(peripheral)
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

  // onDeviceDisconnected(peripheral) {
  //   let toast = this.toastCtrl.create({
  //     message: 'The peripheral unexpectedly disconnected',
  //     duration: 3000,
  //     position: 'middle'
  //   });
  //   toast.present();
  // }

  // // Disconnect peripheral when leaving the page
  // ionViewWillLeave() {
  //   console.log('ionViewWillLeave disconnecting Bluetooth');
  //   this.ble.disconnect(this.peripheral.id).then(
  //     () => console.log('Disconnected ' + JSON.stringify(this.peripheral)),
  //     () => console.log('ERROR disconnecting ' + JSON.stringify(this.peripheral))
  //   )
  // }

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

}
