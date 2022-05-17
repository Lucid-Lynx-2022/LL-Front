import { Injectable } from '@angular/core';
import axios from 'axios';
import { Tuto } from '../../models/tuto/tuto.model';

@Injectable({
  providedIn: 'root'
})
export class TutoService {

  urlAPI = "https://lucidlynx22.herokuapp.com/publics"
  //urlAPI = "http://localhost:4000/publics/"

  constructor() { }


  loadTuto(uid:string): Promise<Tuto[]> {
    console.log(this.urlAPI + '?userId=' + uid)
    return axios.get(this.urlAPI + '?userId=' + uid)
      .then(response => response.data)
  }

  loadAllTutos(): Promise<Tuto[]> {
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
  updateTuto( id : string , newTutoTitle, newTutoDescription, image:FormData){

    if(newTutoTitle && newTutoDescription && image){
      // se actualizan los 3 campos
      return axios.patch(this.urlAPI + '/' + id, { title: newTutoTitle, description: newTutoDescription, image:image},
      {headers: {
        'accept': 'application/json',
         'content-type': 'multipart/form-data' // do not forget this 
        }})
      .then(response => response.data)

    }else if (newTutoTitle && !newTutoDescription && !image){
      // solo se actualiza el titulo
      return axios.patch(this.urlAPI + '/' + id, { title: newTutoTitle})
      .then(response => response.data)

    }else if (!newTutoTitle && newTutoDescription && !image){
      // solo se actualiza la description
      return axios.patch(this.urlAPI + '/' + id, { description: newTutoDescription})
      .then(response => response.data)

    }else if (!newTutoTitle && !newTutoDescription && image){
      // solo se actualiza la imagen
      return axios.patch(this.urlAPI + '/' + id, { image: image},
      {headers: {
        'accept': 'application/json',
         'content-type': 'multipart/form-data' // do not forget this 
        }})
      .then(response => response.data)

    }else if (newTutoTitle && newTutoDescription && !image){
      // solo se actualiza el titulo y la descripcion
            return axios.patch(this.urlAPI + '/' + id, { title: newTutoTitle, description: newTutoDescription})
      .then(response => response.data)

    }else if (newTutoTitle && !newTutoDescription && image){
      // solo se actualiza el titulo e imagen
            return axios.patch(this.urlAPI + '/' + id, { title: newTutoTitle, image:image},
            {headers: {
              'accept': 'application/json',
               'content-type': 'multipart/form-data' // do not forget this 
              }})
            .then(response => response.data)

    }else if (!newTutoTitle && newTutoDescription && image){
      // solo se actualiza la descripcion e imagen
            return axios.patch(this.urlAPI + '/' + id, { description: newTutoDescription, image:image },
            {headers: {
              'accept': 'application/json',
               'content-type': 'multipart/form-data' // do not forget this 
              }})
            .then(response => response.data)

    }
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
