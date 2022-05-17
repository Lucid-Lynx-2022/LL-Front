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

  constructor(public afAuth: AngularFireAuth, private tutoService : TutoService){
    this.loadPublics();
  }

  loadPublics(){
    this.tutoService.loadAllTutos().then(tuto => {
      this.tuto = tuto;
    })
  }

}
