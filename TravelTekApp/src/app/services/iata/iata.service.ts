import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IataService {

  constructor(
    private _http: HttpClient
  ) { }
 
  iataUrl = "http://localhost:8000/api/getIata"

  getCodes(){
    return this._http.get<any[]>(this.iataUrl);   
  }
}