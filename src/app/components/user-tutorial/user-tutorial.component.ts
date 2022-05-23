import { Component, Input, OnInit } from '@angular/core';
import { TutoService } from '../../services/tuto/tuto.service';
import { Tuto } from '../../models/tuto/tuto.model'
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { EditTutorialComponent } from '../edit-tutorial/edit-tutorial.component';
import Swal from 'sweetalert2';


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
  image: File;
  target: HTMLInputElement;
  
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
    this.image = null
    this.target= null
    target.value = "";

    Swal.fire({
      icon: 'error',
      title: 'Tamaño de fichero excedido, Max: ' + this.MAX_SIZE_FILE_KB/1000000 + ' MB',
      showConfirmButton: false,
      timer: 3000
  });
  }else if (target.files && target.files.length > 0) {
    this.target = target
    this.image = target.files[0]
  }  
 }
 saveNewTuto(){

    if(!this.image || !this.tutorial.get('title').value || !this.tutorial.get('description').value){
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Debe completar todos los campos',
        showConfirmButton: false,
        timer: 1500
    });
      return 
    }

    if(this.tutorial.get('title').value.trim() === "" || this.tutorial.get('description').value.trim() === ""){
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Debe de insertar caracteres si quiere añadir nuevo tutorial',
        showConfirmButton: false,
        timer: 1500
    });
      return 
    }


    Swal.showLoading();
    this.tutoService.saveNewTuto(this.tutorial.get('title').value, this.tutorial.get('description').value, 
                                this.uid, this.displayName, this.email, new Date().toLocaleDateString(),
                                this.image)
    .then((response) => {
      Swal.fire({
        icon: 'success',
        title: 'Tutorial Creado',
        showConfirmButton: false,
        timer: 1500
    });
      this.loadMyPublics();
      this.tutorial.reset();
      // resetar input file
      this.target.value = "";
      this.image = null
      this.target= null
    })
    .catch((error) => {
      //console.log(error.response.data.msg)
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Error: ya exite una publicacion con el mismo titulo',
        showConfirmButton: false,
        timer: 3000
    });
    })

  }

  loadMyPublics(){
    Swal.showLoading();
    this.tutoService.loadTuto(this.uid).then(tuto => {
      this.tuto = tuto.reverse();
      Swal.close();
    })
  }

  deleteThisTuto(tuto : Tuto){
    Swal.showLoading();    
    this.tutoService.deleteTuto(tuto._id as string)
      .then(response => {
        this.tuto = this.tuto.filter(t => t._id !== tuto._id)
        Swal.fire({
          icon: 'success',
          title: 'Tutorial Eliminado',
          showConfirmButton: false,
          timer: 1500
      });
      })
  }



  isImage(url : string){
    if(url === undefined) return false;
    if(url.endsWith('.jpeg') || url.endsWith('.png')|| url.endsWith('.gif')){
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
