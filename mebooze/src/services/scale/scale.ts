import { Injectable } from '@angular/core';

@Injectable()
export class ScaleService {

    data: any;

    constructor() {
        this.data = '';
    }

    setData(data) {
        this.data = data;
    }

    getData() {
        return this.data;
    }
}