import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { first, Observable } from 'rxjs';
import { Student } from '../students/student';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  students: Student[] = [];

  constructor(private db: AngularFireDatabase) {

    this.db.list('Students').valueChanges().subscribe(change => {
      if (this.students.length < 1) {
        for (let trip of change){
          this.students.push(trip as Student);
        }
      } else {
        this.students = [];
        for (let student of change){
          this.students.push(student as Student);
        }
      }
    })
    console.log(this.students);
    }

    getStudents(): Observable<any>{
    return this.db.list('Students').valueChanges();
    }

    deleteStudent(selectedStudent: Student){
    this.db.list('Students').snapshotChanges().pipe(first()).subscribe((items:any) =>{
      for(let i of items){
        console.log(i.payload.val().key, selectedStudent.key);
        if(i.payload.val().key==selectedStudent.key){
          this.db.list('Students').remove(i.payload.key);
        }
      }
    } )
  }

  deleteAll(){
    this.db.list('Students').snapshotChanges().pipe(first()).subscribe((items:any) =>{
        this.db.list('Students').remove();
    } )
  }

  addStudent(student: Student){
    this.db.list('Students').push ({
          key: this.students.length + 1,
          name: student.name,
          age: student.age
    })
  }
}
