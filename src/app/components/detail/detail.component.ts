import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TutoService } from 'src/app/services/tuto/tuto.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  email: string;
  uid: string;
  displayName: string;

  loading : boolean = false;

  public: any = [];

  constructor(private location: Location,public auth: AuthService, public router: Router, private route: ActivatedRoute, private tutoService: TutoService, private afAuth: AngularFireAuth)  {
    this.loadPublic();
  }

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

  async loadPublic(): Promise<void>{
    this.loading = true;
    const _id = this.route.snapshot.paramMap.get('_id');
    this.public = await this.tutoService.getUserById(String(_id));
    this.loading = false;
  }

  back(){
    this.location.back()
  }

  isImage(url : string){
    if(url === undefined) return false;
    if(url.endsWith('.jpeg') || url.endsWith('.png')|| url.endsWith('.gif')){
      return true;
    }else{
      return false;
    }
  }

  isVideo(url : string){
    if(url === undefined) return false;
    if(url.endsWith('.mp4') ){
      return true;
    }else{
      return false;
    }
  }

}
