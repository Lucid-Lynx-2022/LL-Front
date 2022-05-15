import { Component, OnInit } from '@angular/core';
import { TutoService } from '../../services/tuto/tuto.service';
import { Tuto } from '../../models/tuto/tuto.model'

@Component({
  selector: 'app-user-tutorial',
  templateUrl: './user-tutorial.component.html',
  styleUrls: ['./user-tutorial.component.scss']
})
export class UserTutorialComponent{


  tuto : Tuto[] = [];

  constructor(private tutoService : TutoService){
    this.loadPublics();
  }

  loadPublics(){
    this.tutoService.loadTuto().then(tuto => {
      this.tuto = tuto;
    })
  }

}
