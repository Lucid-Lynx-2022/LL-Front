import { Component } from '@angular/core';
import { TutoService } from '../../services/tuto/tuto.service';
import { Tuto } from '../../models/tuto/tuto.model'
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  tuto : Tuto[] = [];
  Recenttutos : Tuto[] = [];
  Recenttuto : Tuto[] = [];

  loading : boolean = false;

  constructor(public afAuth: AngularFireAuth, private tutoService : TutoService){
    this.loadPublics();
    this.loadRecentPublics();
  }
  
  loadRecentPublics(){
    this.loading = true;
    this.tutoService.loadRecentTutos().then(tutos => {
      this.Recenttutos = tutos;
      this.Recenttuto.push(this.Recenttutos[0])
      this.loading = false;
    })
  }

  loadPublics(){
    this.loading = true;
    this.tutoService.loadHomeTutos().then(tuto => {
      this.tuto = tuto;
      this.loading = false;
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
