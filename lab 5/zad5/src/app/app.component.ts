import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { Student } from './students/student';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   description = 'GR - Przykladowa apliakcja typu CRUD do Firestore';

}
