import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BleConnectPage } from './ble-connect';

@NgModule({
  declarations: [
    BleConnectPage,
  ],
  imports: [
    IonicPageModule.forChild(BleConnectPage),
  ],
})
export class BleConnectPageModule {}
