import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  constructor(private postService: DataserviceService,
    private photosService: DataserviceService){}

  howManyPosts = 0;
  howManyPhotos = 0;

  ngOnInit(): void {
    this.postService.getPosts().subscribe(res => this.howManyPosts = res.length)
    this.photosService.getPhotos().subscribe(res => this.howManyPhotos = res.length)
  }
  
}
