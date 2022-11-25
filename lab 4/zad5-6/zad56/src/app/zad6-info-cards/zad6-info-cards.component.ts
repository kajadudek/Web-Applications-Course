import { Component, OnInit } from '@angular/core';
import angularTopics from 'src/assets/angularTopics.json';

export interface Card {
    topic: string;
    shortcut: string;
    info: string;
}

@Component({
  selector: 'app-zad6-info-cards',
  templateUrl: './zad6-info-cards.component.html',
  styleUrls: ['./zad6-info-cards.component.css']
})

export class Zad6InfoCardsComponent implements OnInit {
    data: any;

    infoCards: Card[] = [];

    constructor() {
        this.data = angularTopics;
        console.log(this.data)
    }

    ngOnInit(): void {
        for (let topics in angularTopics){
            this.infoCards.push({
                topic: topics,
                shortcut: this.data[topics]["shortcut"],
                info: this.data[topics]["informations"]
            } as Card)
        }
        console.log(this.infoCards)
    }

}
