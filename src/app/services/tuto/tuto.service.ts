import { Injectable } from '@angular/core';
import axios from 'axios';
import { Tuto } from '../../models/tuto/tuto.model';

@Injectable({
  providedIn: 'root'
})
export class TutoService {
  TOKEN = '2E%[/QAfv-]u7uUttuC]d@MWnh]{rgVm?v}vcaZa%GA_uePj(pZ+-2&?Tpg_/gQEMRF4(?jt=pR_Fz&2T%@W[U{f4J6T32,h77#vtAq=cu;A8K_@t!dNhU&%j_uZSTEWy:DyTgq4f{$6=dRr+9F3%fK-gBaYyxt,H*ng,3Y$Q8*fHp{[*SZjk*a9*.(8##jy:4hqTehH}wvfpMptwv{XgE7L[{Q[g=CHpVX7k3hi#VcvKaia&+?f?6KVR;/(Sy:{:!aq6%$nv2N*)+&+566TNE(N)Z;bSM#:3Rq5rxQdwytB'

  //urlAPI = "https://lucidlynx22.herokuapp.com/publics"
  urlAPI = "http://localhost:4000/publics/"

  constructor() { }


  loadTuto(uid:string): Promise<Tuto[]> {
    return axios.get(this.urlAPI + '?userId=' + uid,
    {headers: {
      'token': this.TOKEN // do not forget this  
      }})
      .then(response => response.data)
  }
  loadRecentTutos(): Promise<Tuto[]> {
    return axios.get(this.urlAPI + '?recent=true',
    {headers: {
      'token': this.TOKEN // do not forget this  
      }})
      .then(response => response.data)
  }
  loadAllTutos(): Promise<Tuto[]> {
    return axios.get(this.urlAPI,
      {headers: {
        'token': this.TOKEN // do not forget this 
        }})
      .then(response => response.data)
  }
  loadHomeTutos(): Promise<Tuto[]> {
    return axios.get(this.urlAPI + '?home=true',
      {headers: {
        'token': this.TOKEN // do not forget this 
        }})
      .then(response => response.data)
  }
  saveNewTuto(newTutoTitle: string, newTutoDescription: string, newTutoUid: string, newTutoAutor: string, newTutoEmail: string, newTutoFecha: string, image: FormData){
    return axios.post(this.urlAPI, { title: newTutoTitle, description: newTutoDescription, userId: newTutoUid, displayName: newTutoAutor, email: newTutoEmail, date: newTutoFecha, image:image },
      {headers: {
        'token': this.TOKEN, // do not forget this 
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
        'token': this.TOKEN, // do not forget this 
        'accept': 'application/json',
         'content-type': 'multipart/form-data' // do not forget this 
        }})
      .then(response => response.data)

    }else if (newTutoTitle && !newTutoDescription && !image){
      // solo se actualiza el titulo
      return axios.patch(this.urlAPI + '/' + id, { title: newTutoTitle},
      {headers: {
        'token': this.TOKEN // do not forget this  
        }})
        .then(response => response.data)

    }else if (!newTutoTitle && newTutoDescription && !image){
      // solo se actualiza la description
      return axios.patch(this.urlAPI + '/' + id, { description: newTutoDescription},
      {headers: {
        'token': this.TOKEN // do not forget this  
        }})
        .then(response => response.data)

    }else if (!newTutoTitle && !newTutoDescription && image){
      // solo se actualiza la imagen
      return axios.patch(this.urlAPI + '/' + id, { image: image},
      {headers: {
        'token': this.TOKEN, // do not forget this 
        'accept': 'application/json',
         'content-type': 'multipart/form-data' // do not forget this 
        }})
      .then(response => response.data)

    }else if (newTutoTitle && newTutoDescription && !image){
      // solo se actualiza el titulo y la descripcion
            return axios.patch(this.urlAPI + '/' + id, { title: newTutoTitle, description: newTutoDescription},
            {headers: {
              'token': this.TOKEN // do not forget this  
              }})
              .then(response => response.data)

    }else if (newTutoTitle && !newTutoDescription && image){
      // solo se actualiza el titulo e imagen
            return axios.patch(this.urlAPI + '/' + id, { title: newTutoTitle, image:image},
            {headers: {
              'token': this.TOKEN, // do not forget this 
              'accept': 'application/json',
               'content-type': 'multipart/form-data' // do not forget this 
              }})
            .then(response => response.data)

    }else if (!newTutoTitle && newTutoDescription && image){
      // solo se actualiza la descripcion e imagen
            return axios.patch(this.urlAPI + '/' + id, { description: newTutoDescription, image:image },
            {headers: {
              'token': this.TOKEN, // do not forget this 
              'accept': 'application/json',
               'content-type': 'multipart/form-data' // do not forget this 
              }})
            .then(response => response.data)

    }
  }

  deleteTuto( id : string ){
    return axios.delete(this.urlAPI + '/' + id,
    {headers: {
      'token': this.TOKEN // do not forget this  
      }})
      .then(response => response.data)
  }

  getUserById(id : string){
    return axios.get(`${ this.urlAPI}/${id}`,
    {headers: {
      'token': this.TOKEN // do not forget this  
      }})
      .then(response => response.data)
  }
}
