import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TutoService } from 'src/app/services/tuto/tuto.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  listTutos: any[] = [];
  
  email: string;
  uid: string;
  displayName: string;
  tutorial: FormGroup;
  constructor(public auth: AuthService, public router: Router, private afAuth: AngularFireAuth, private fb: FormBuilder, private tutoService: TutoService)  { 
    this.tutorial = this.fb.group({
      title: '',
      description: '',
    });
  }

  ngOnInit(): void {
   
     if( !this.auth.userLoggedIn) {
      this.router.navigate(['/home']);
     }

    this.afAuth.currentUser.then((user) => {
      this.email =user.email
      this.uid =user.uid
      this.displayName =user.displayName
    });
    this.getTutos();
  }

  addTutorial() {
    console.log(this.tutorial.value);

    const Tutorial: any = {
      title: this.tutorial.get('title').value,
      description: this.tutorial.get('description').value,
      uid: this.uid,
      
      autor: this.displayName,
      email: this.email,
      fecha: new Date().toLocaleDateString()
    } 
  console.log(Tutorial);
  }

  getTutos() {
    this.tutoService.loadTuto().then((data) => {
      console.log(data);
      this.listTutos = data;
    })
  }

  deleteTuto(id: string) {
    this.tutoService.deleteTuto(id).then((data) => {
      console.log(data);
      this.getTutos();
    })
  }

  addTuto() {
    this.tutoService.saveNewTuto(this.tutorial.get('title').value, this.tutorial.get('description').value, this.uid, this.displayName, this.email, new Date().toLocaleDateString()).then((data) => {
      console.log(data);
      this.getTutos();
    })
  }

}
