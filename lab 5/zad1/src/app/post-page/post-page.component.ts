import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent {

  constructor(private data: DataserviceService) { }

  postsArr: any[] = []

  ngOnInit(): void {
    this.data.getPosts().subscribe(res => this.postsArr=res)
    console.log(this.postsArr);
  }
}
