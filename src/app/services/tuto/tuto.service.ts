import { Injectable } from '@angular/core';
import axios from 'axios';
import { Tuto } from '../../models/tuto/tuto.model';

@Injectable({
  providedIn: 'root'
})
export class TutoService {

  //urlAPI = "https://lucidlynx22.herokuapp.com/publics"
  urlAPI = "http://localhost:4000/publics"

  constructor() { }


  loadTuto(): Promise<Tuto[]> {
    return axios.get(this.urlAPI)
      .then(response => response.data)
  }

  saveNewTuto(newTutoTitle: string, newTutoDescription: string, newTutoUid: string, newTutoAutor: string, newTutoEmail: string, newTutoFecha: string, image: FormData){
    return axios.post(this.urlAPI, { title: newTutoTitle, description: newTutoDescription, userId: newTutoUid, displayName: newTutoAutor, email: newTutoEmail, date: newTutoFecha, image:image },
      {headers: {
        'accept': 'application/json',
         'content-type': 'multipart/form-data' // do not forget this 
        }})
      .then(response => response.data)

  }
  updateTuto( id : string , newTutoTitle: string, newTutoDescription: string){
    return axios.patch(this.urlAPI + '/' + id, { title: newTutoTitle, description: newTutoDescription})
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
