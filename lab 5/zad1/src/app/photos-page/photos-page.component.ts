import { Component } from '@angular/core';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-photos-page',
  templateUrl: './photos-page.component.html',
  styleUrls: ['./photos-page.component.css']
})
export class PhotosPageComponent {

  constructor(private photoData: DataserviceService) {
  }

  photos: any[] = []

  ngOnInit(): void {
    this.photoData.getPhotos().subscribe(res => this.photos = res);
  }
}
