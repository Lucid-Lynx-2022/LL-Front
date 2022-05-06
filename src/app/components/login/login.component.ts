import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    googleLogoURL: string;
    hide = true;
    loginForm: FormGroup;
    firebaseErrorMessage: string;

    constructor(
        private authService: AuthService, 
        private router: Router, 
        private afAuth: AngularFireAuth,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
        ) {
        this.loginForm = new FormGroup({
            'email': new FormControl('', [Validators.required, Validators.email]),
            'password': new FormControl('', Validators.required)
        });

        this.firebaseErrorMessage = '';
        this.googleLogoURL = 'https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg';
        this.matIconRegistry.addSvgIcon(
            "logo",
            this.domSanitizer.bypassSecurityTrustResourceUrl(this.googleLogoURL));
            
    }

    ngOnInit(): void {
        
    }

    loginUser() {
        if (this.loginForm.invalid)
            return;

        this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then((result) => {
            if (result == null) {                               // null is success, false means there was an error
                console.log('logging in...');
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
