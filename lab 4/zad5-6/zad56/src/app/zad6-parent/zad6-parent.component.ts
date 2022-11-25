import { Component, OnInit, ViewChild } from '@angular/core';
import { Zad6InfoCardsComponent } from '../zad6-info-cards/zad6-info-cards.component';

@Component({
  selector: 'app-zad6-parent',
  templateUrl: './zad6-parent.component.html',
  styleUrls: ['./zad6-parent.component.css']
})
export class Zad6ParentComponent{
  topic!: string;
  info!: string;

  processDataFromChild(receivedData: any){
    this.topic = receivedData["topic"];
    this.info = receivedData["info"];
  }

  @ViewChild(Zad6InfoCardsComponent) child!: Zad6InfoCardsComponent;
}
