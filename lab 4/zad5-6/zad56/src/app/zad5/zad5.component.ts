import { Component } from '@angular/core';
import carsData from 'src/assets/cars.json';

@Component({
  selector: 'app-zad5',
  templateUrl: './zad5.component.html',
  styleUrls: ['./zad5.component.css']
})
export class Zad5Component{

    brand!: string;
    model!: string;
    color!: string;
    lastColor!: string;
    carsData: any;

    constructor() { 
        this.carsData = carsData
    }
    
    colorsSelected = false
    brandsSelected = false
    modelsSelected = false

    brandIsSelected(){
        this.brandsSelected = true
        this.modelsSelected = false
        this.colorsSelected = false
    }

    modelIsSelected(){
        this.modelsSelected = true
        this.colorsSelected = false
    }

    colorIsSelected(color: any){
        this.lastColor = color
        this.colorsSelected = true;
    }
}