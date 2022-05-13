import { Injectable } from '@angular/core';
import axios from 'axios';
//import { Task } from './../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TutoService {

  urlAPI = "http://localhost:4000/publics"
  constructor() { }


  loadTuto(): Promise<any> {
    return axios.get(this.urlAPI)
      .then(response => response.data)
  }

  saveNewTuto(newTutoTitle: string, newTutoDescription: string, newTutoUid: string, newTutoAutor: string, newTutoEmail: string, newTutoFecha: string){
    return axios.post(this.urlAPI, { title: newTutoTitle, description: newTutoDescription, userId: newTutoUid, displayName: newTutoAutor, email: newTutoEmail, date: newTutoFecha })
      .then(response => response.data)

  }


  deleteTuto( id : string ){
    return axios.delete(this.urlAPI + '/' + id)
      .then(response => response.data)
  }
}
