import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BleConnectPage } from '../pages/ble-connect/ble-connect';
import { CategoriesPage } from '../pages/categories/categories';
import { DrinksPage } from '../pages/drinks/drinks';
import { IngredientsPage } from '../pages/ingredients/ingredients';
import { ProcessPage } from '../pages/process/process';

// custom header component
import { HeaderComponent } from '../components/header/header';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ScaleService } from '../services/scale/scale';
import { CocktailService } from '../services/cocktail/cocktail';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BleConnectPage,
    CategoriesPage,
    DrinksPage,
    IngredientsPage,
    ProcessPage,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BleConnectPage,
    CategoriesPage,
    DrinksPage,
    IngredientsPage,
    ProcessPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScaleService,
    CocktailService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BLE
  ]
})
export class AppModule {}
