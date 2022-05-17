import { Component, Input, OnInit } from '@angular/core';
import { TutoService } from '../../services/tuto/tuto.service';
import { Tuto } from '../../models/tuto/tuto.model'
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { EditTutorialComponent } from '../edit-tutorial/edit-tutorial.component';


@Component({
  selector: 'app-user-tutorial',
  templateUrl: './user-tutorial.component.html',
  styleUrls: ['./user-tutorial.component.scss']
})



export class UserTutorialComponent implements OnInit{
  MAX_SIZE_FILE_KB =  40000000 //40MB

  tuto : Tuto[] = [];
  tutorial: FormGroup;

  newTutoUid = "";
  newTutoAutor = "";
  newTutoEmail = "";
  newTutoFecha = "";

  email: string;
  uid: string;
  displayName: string;
  image;
  
  constructor(public auth: AuthService, public dialog: MatDialog, public router: Router, private afAuth: AngularFireAuth, private fb: FormBuilder, private tutoService: TutoService)  { 
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
     if (user.displayName==null){
      var res = user.email.split("@");
      this.displayName = res[0]
    }else{
      this.displayName = user.displayName
    }
   }).then((h) => {
     this.loadMyPublics();
   })
 }

 onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if(target.files[0].size > this.MAX_SIZE_FILE_KB){
    //mensaje emergente de tamaño de fichero excedido
  }
  if (target.files && target.files.length > 0) {
    this.image = target.files[0]
  }  
 }
 saveNewTuto(){
    this.tutoService.saveNewTuto(this.tutorial.get('title').value, this.tutorial.get('description').value, 
                                this.uid, this.displayName, this.email, new Date().toLocaleDateString(),
                                this.image)
    .then((newTuto) => {
      // añadir mensaje emergente de publicacion añadida correctamente
      this.loadMyPublics();
      this.tutorial.reset();
    })
  }

  loadMyPublics(){
    this.tutoService.loadTuto(this.uid).then(tuto => {
      this.tuto = tuto;
    })
  }

  deleteThisTuto(tuto : Tuto){
    this.tutoService.deleteTuto(tuto._id as string)
      .then(response => {
        this.tuto = this.tuto.filter(t => t._id !== tuto._id)
      })
  }



  isImage(url : string){
    if(url === undefined) return false;
    if(url.endsWith('.jpeg') || url.endsWith('.png')){
      return true;
    }else{
      return false;
    }
  }

  isVideo(url : string){
    if(url === undefined) return false;
    if(url.endsWith('.mp4')){
      return true;
    }else{
      return false;
    }
  }

  openDialog(tuto : Tuto) {
    this.dialog.open(EditTutorialComponent, {
      data: tuto._id, 
    });
  }

}
