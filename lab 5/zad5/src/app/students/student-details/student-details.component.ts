import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { StudentService } from '../../services/student.service';
import { Student } from '../student';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  @Input() student!: Student;

  constructor(private studentService: FirebaseService) { }

  ngOnInit() {
  }

  deleteStudent() {
    this.studentService.deleteStudent(this.student);
  }

}
