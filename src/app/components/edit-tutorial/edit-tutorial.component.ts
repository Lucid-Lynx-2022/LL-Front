import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Tuto } from 'src/app/models/tuto/tuto.model';
import { TutoService } from 'src/app/services/tuto/tuto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-tutorial',
  templateUrl: './edit-tutorial.component.html',
  template: 'passed in {{ data.tutoId }}',
  styleUrls: ['./edit-tutorial.component.scss']
})
export class EditTutorialComponent implements OnInit {

  MAX_SIZE_FILE_KB =  40000000 //40MB

  tuto : Tuto[] = [];
  tutorial: FormGroup;
  image: File = undefined;
  target: HTMLInputElement;

  constructor(@Inject(MAT_DIALOG_DATA) public data: string, 
                private tutoService: TutoService, 
                private fb: FormBuilder, 
                public dialogRef: MatDialogRef<EditTutorialComponent>,
                public router: Router) 
  {
    this.tutorial = this.fb.group({
      title: '',
      description: '',
    });
   }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  updateTuto(){
    if(this.tutorial.get('title').value){
      if(this.tutorial.get('title').value.trim() === ""){
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Debe de insertar caracteres si quiere actualizar titulo',
          showConfirmButton: false,
          timer: 1500
      });
        return 
      }
    }
    if(this.tutorial.get('description').value){
      if(this.tutorial.get('description').value.trim() === ""){
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Debe de insertar caracteres si quiere actualizar descripcion',
          showConfirmButton: false,
          timer: 1500
      });
        return 
      }
    }
    if(!this.image && !this.tutorial.get('title').value && !this.tutorial.get('description').value){
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Debe completar alguno de los campos',
        showConfirmButton: false,
        timer: 1500
    });
      return 
    }

    Swal.showLoading();
    this.tutoService.updateTuto(this.data as string,this.tutorial.get('title').value, this.tutorial.get('description').value, this.image)
    .then((upTuto) => { 
      Swal.fire({
        icon: 'success',
        title: 'Tutorial Actualizado',
        showConfirmButton: false,
        timer: 1500
      });
      // resetar input file
      try {
        this.target.value = "";
        this.image = null
        this.target= null
      } catch (error) {
        
      }
      this.tutorial.reset();
      this.close();
      this.router.navigate(['/home'], { skipLocationChange: true }).then(() => {
        this.router.navigate(['/tutorial']);
      });
    })
    .catch((error) => {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Error: ya exite una publicacion con el mismo titulo',
        showConfirmButton: false,
        timer: 3000
    });
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
}
