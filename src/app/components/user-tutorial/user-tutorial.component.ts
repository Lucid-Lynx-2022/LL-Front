import { Component, OnInit } from '@angular/core';
import { TutoService } from '../../services/tuto/tuto.service';
import { Tuto } from '../../models/tuto/tuto.model'
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-user-tutorial',
  templateUrl: './user-tutorial.component.html',
  styleUrls: ['./user-tutorial.component.scss']
})
export class UserTutorialComponent implements OnInit{

  tuto : Tuto[] = [];
  tutorial: FormGroup;

  newTutoUid = "";
  newTutoAutor = "";
  newTutoEmail = "";
  newTutoFecha = "";

  email: string;
  uid: string;
  displayName: string;
  
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
   this.loadPublics();
 }

  saveNewTask(){
    this.tutoService.saveNewTuto(this.tutorial.get('title').value, this.tutorial.get('description').value, this.uid, this.displayName, this.email, new Date().toLocaleDateString())
    .then((newTuto) => {
      this.loadPublics();
      this.tutorial.reset();
    })
  }

  /*
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
  */

  loadPublics(){
    this.tutoService.loadTuto().then(tuto => {
      this.tuto = tuto;
    })
  }

  deleteThisTuto(tuto : Tuto){
    this.tutoService.deleteTuto(tuto._id as string)
      .then(response => {
        this.tuto = this.tuto.filter(t => t._id !== tuto._id)
      })
  }

}
