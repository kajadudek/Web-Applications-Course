import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  
  constructor(private route: ActivatedRoute, private photoService: DataserviceService) { }

  id = 0;
  // photoUrl!: string;
  // photoTitle!: string;
  photo!: any;

  ngOnInit(): void {

    this.route.params.subscribe(params => {
        this.id = params['id'];
    })

    this.photoService.getPhoto(this.id.toString()).subscribe(res => 
      this.photo = res)
  }  
}
