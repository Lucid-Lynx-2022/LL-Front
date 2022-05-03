import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(public afAuth: AngularFireAuth) { }

    ngOnInit(): void {
    }

    logout(): void {
        this.afAuth.signOut();
    }

}
