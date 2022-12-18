import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { map } from 'rxjs/operators';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Student } from '../student';

@Component({
  selector: 'app-student-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  // students: any;
   
  constructor(private studentService: StudentService,
    private db: FirebaseService){}

  students: Student[] = [];

  ngOnInit(): void { 
   this.db.getStudents().subscribe(change => {
     if (this.students == undefined ||this.students.length < 1) {
       for (let trip of change){
         this.students.push(trip as Student);
       }
     }else {
       this.students = [];
       for (let trip of change){
         this.students.push(trip as Student);
       }
     }
   });
 }

  deleteStudents() {
    this.db.deleteAll();
  }

}
