import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(
    private _http: HttpClient
  ) { }
 
  flightUrl = "http://localhost:8000/api/getFlights" 

  getFlights(maxNum){
    return this._http.get<any[]>(
      this.flightUrl, {params: { max: maxNum}});
      
  }
}