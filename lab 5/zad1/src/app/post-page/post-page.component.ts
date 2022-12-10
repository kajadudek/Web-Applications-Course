import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { title } from 'process';
import { max } from 'rxjs';
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
    this.data.getPosts().subscribe(res => this.postsArr = res)
  }

  postForms = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required)    
  })

  sendPost() {
    if (this.postForms.valid){
      let newPost = {
        "userId": 0,
        "id": this.postsArr.length + 1,
        "title": this.postForms.get('title')!.value,
        "body": this.postForms.get('content')!.value 
      }
  
      this.data.sendPost(JSON.stringify(newPost)).subscribe(res => this.postsArr.splice(0, 0, newPost))
      this.postForms.reset();
    }
  }
}
