import { Component } from '@angular/core';
import { TutoService } from '../../services/tuto/tuto.service';
import { Tuto } from '../../models/tuto/tuto.model'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  HomeTutos : Tuto[] = [];
  RecentTutos : Tuto[] = [];


  constructor(public afAuth: AngularFireAuth, private tutoService : TutoService){
    this.loadPublics();
    this.loadRecentPublics();
  }
  
  loadRecentPublics(){
    Swal.showLoading();
      this.tutoService.loadRecentTutos().then(tutos => {
      this.RecentTutos = tutos;
      Swal.close();
    })
  }

  loadPublics(){
    Swal.showLoading();
    this.tutoService.loadHomeTutos().then(tuto => {
      this.HomeTutos = tuto;
      Swal.close();
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

}
