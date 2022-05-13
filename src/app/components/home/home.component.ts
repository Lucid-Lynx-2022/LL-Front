import { Component } from '@angular/core';
import { PublicsService } from '../../services/publics/publics.service';
import { Publics } from '../../models/publics/publics.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  publics : Publics[] = [];

  constructor(private publicsService : PublicsService){
    this.loadPublics();
  }

  loadPublics(){
    this.publicsService.cargarPublics().then(publics => {
      this.publics = publics;
    })
  }
}
