import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CocktailService {

    // private url: string = 'http://18.221.149.211/api/';
    private url: string = '/api/';
    

    constructor(private http: Http) {
    }

    getCategories() {
        return this.http.get(this.url + 'categories');
    }

    getDrinkByCategory(id) {
        return this.http.get(this.url + 'categories/' + id);
    }

    getIngredientsByDrink(id) {
        return this.http.get(this.url + 'cocktails/' + id);
    }
}