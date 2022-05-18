import { Component, OnInit } from '@angular/core';
import { TutoService } from '../../services/tuto/tuto.service';
import { Tuto } from '../../models/tuto/tuto.model'
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{

  tuto : Tuto[] = [];
  searchText: any;
  constructor(private tutoService : TutoService){
    this.loadPublics();
  }

  loadPublics(){
    this.tutoService.loadAllTutos().then(tuto => {
      this.tuto = tuto;
    })
  }
  
  ngOnInit(){
    console.log(this.searchText)
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

}
