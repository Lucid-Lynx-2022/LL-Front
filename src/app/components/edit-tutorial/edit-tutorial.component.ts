import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-tutorial',
  templateUrl: './edit-tutorial.component.html',
  styleUrls: ['./edit-tutorial.component.scss']
})
export class EditTutorialComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditTutorialComponent>) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

}
