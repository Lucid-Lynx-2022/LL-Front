import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    hide = true;
    loginForm: FormGroup;
    firebaseErrorMessage: string;

    constructor(public authService: AuthService, private router: Router, private afAuth: AngularFireAuth) {
        this.loginForm = new FormGroup({
            'email': new FormControl('', [Validators.required, Validators.email]),
            'password': new FormControl('', Validators.required)
        });

        this.firebaseErrorMessage = '';
    }

    ngOnInit(): void {
        
    }

    loginUser() {
        if (this.loginForm.invalid)
            return;

        this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then((result) => {
            if (result == null) {                               // null is success, false means there was an error
                console.log('logging in...');
                Swal.fire({
                    icon: 'success',
                    title: 'Loging success',
                    showConfirmButton: false,
                    timer: 1500
                });
                this.router.navigate(['/home']);                // when the user is logged in, navigate them to dashboard
            }
            else if (result.isValid == false) {
                console.log('login error', result);
                this.firebaseErrorMessage = result.message;
            }
        });
    }

    onSuccess(googleUser) {
        console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
      }
    onFailure(error) {
        console.log(error);
      }
}