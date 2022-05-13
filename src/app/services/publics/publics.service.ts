import { Injectable } from '@angular/core';
import axios from 'axios';
import { Publics } from '../../models/publics/publics.model';

@Injectable({
    providedIn: 'root'
})
export class PublicsService {

    //urlAPI = 'https://lucidlynx22.herokuapp.com/publics';
    urlAPI = 'http://localhost:5000/publics'

    constructor() {}

    cargarPublics() : Promise<Publics[]>{
        return axios.get(this.urlAPI)
        .then(response => response.data)
    }
}