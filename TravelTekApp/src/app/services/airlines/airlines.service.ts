import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AirlinesService {

  constructor(
    private _http: HttpClient
  ) { }
 
  aLineUrl = "http://localhost:8000/api/getAirlineImg"

  getAirlines(){
    return this._http.get<any[]>(this.aLineUrl);
      
  }
}