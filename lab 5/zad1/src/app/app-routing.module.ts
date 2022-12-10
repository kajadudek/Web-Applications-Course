import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PhotoComponent } from './photo/photo.component';
import { PhotosPageComponent } from './photos-page/photos-page.component';
import { PostPageComponent } from './post-page/post-page.component';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'posts', component: PostPageComponent },
  { path: 'photos', component: PhotosPageComponent },
  { path: 'photos/:id', component: PhotoComponent},
  { path: '**', component: HomePageComponent } 
];
 

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
