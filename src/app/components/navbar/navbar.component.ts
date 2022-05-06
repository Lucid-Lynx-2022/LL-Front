import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import Swal from 'sweetalert2';

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
      Swal.fire({
        icon: 'success',
        title: 'Logout success',
        showConfirmButton: false,
        timer: 1500
      });
        this.afAuth.signOut();
    }

}
