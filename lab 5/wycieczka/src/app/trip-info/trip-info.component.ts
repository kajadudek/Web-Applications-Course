import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicedataService } from '../servicedata.service';

@Component({
  selector: 'app-trip-info',
  templateUrl: './trip-info.component.html',
  styleUrls: ['./trip-info.component.css']
})
export class TripInfoComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: ServicedataService) { }

  name = 0;
  trip!: any;

  ngOnInit(): void {


    this.route.params.subscribe(params => {
        this.name = params['vacants'];
    })

    // this.service.getTrips(this.name);
  }  
}
