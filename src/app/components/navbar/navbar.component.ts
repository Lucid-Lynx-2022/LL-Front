import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth) { }

    ngOnInit(): void {
    }

    logout(): void {
        this.afAuth.signOut();
    }

}
