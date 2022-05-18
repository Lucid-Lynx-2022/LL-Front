import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  loading : boolean = false;

  email: string;
  uid: string;
  displayName: string;
  constructor(public auth: AuthService, public router: Router, private afAuth: AngularFireAuth)  {}

  ngOnInit(): void {
   
    if( !this.auth.userLoggedIn) {
      this.router.navigate(['/home']);
    }

    this.loading = true;
    this.afAuth.currentUser.then((user) => {
      this.email =user.email
      //user.getIdToken
      this.uid =user.uid
      if (user.displayName==''){
        var res = user.email.split("@");
        this.displayName = res[0]
      }else{
        this.displayName = user.displayName
      }
      this.loading = false;
    });
  }

}
