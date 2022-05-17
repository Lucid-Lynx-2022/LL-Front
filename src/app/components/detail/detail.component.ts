import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  email: string;
  uid: string;
  displayName: string;
  constructor(public auth: AuthService, public router: Router, private afAuth: AngularFireAuth)  {}

  ngOnInit(): void {
   
     if( !this.auth.userLoggedIn) {
      this.router.navigate(['/home']);
     }

    this.afAuth.currentUser.then((user) => {
      this.email =user.email
      this.uid =user.uid
      this.displayName =user.displayName
    });
  }

}