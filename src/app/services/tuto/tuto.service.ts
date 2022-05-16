import { Injectable } from '@angular/core';
import axios from 'axios';
import { Tuto } from '../../models/tuto/tuto.model';

@Injectable({
  providedIn: 'root'
})
export class TutoService {

  urlAPI = "https://lucidlynx22.herokuapp.com/publics"
  constructor() { }


  loadTuto(): Promise<Tuto[]> {
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

  getUserById(id : string){
    return axios.get(`${ this.urlAPI}/${id}`)
      .then( result => result.data)
  }
}
