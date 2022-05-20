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
  image = undefined;

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

    this.tutoService.updateTuto(this.data as string,this.tutorial.get('title').value, this.tutorial.get('description').value, this.image)
    .then((upTuto) => {
      // añadir mensaje emergente de publicacion actualizada con exito
      // refrescar la pagina de las publicaciones para ver los cambios 
      Swal.fire({
        icon: 'success',
        title: 'Tutorial Actualizado',
        showConfirmButton: false,
        timer: 1500
      });
      this.tutorial.reset();
      this.close();
      this.router.navigate(['/home'], { skipLocationChange: true }).then(() => {
        this.router.navigate(['/tutorials']);
      });
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

}
