import { Component } from '@angular/core';
import { TutoService } from '../../services/tuto/tuto.service';
import { Tuto } from '../../models/tuto/tuto.model'
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent{

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
