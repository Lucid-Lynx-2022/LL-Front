import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router) { }

    ngOnInit(): void {
    }

    logout(): void {
      Swal.fire({
        icon: 'success',
        title: 'Logout success',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/login']); 
      this.afAuth.signOut();
    }
}