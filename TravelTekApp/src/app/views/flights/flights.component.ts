import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/app/services/flight/flight.service';
import { Flight } from '../../classes/flight/flight';
import { IataService } from '../../services/iata/iata.service';
import { Iata } from '../../classes/iata/iata';
import { AirlineImg } from 'src/app/classes/airlineImg/airline-img';
import { AirlinesService } from 'src/app/services/airlines/airlines.service';


@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {

  flight: Flight;
  flights: Array<Flight> = [];

  iata: Iata;
  iataData:any;
  codes: Array<Iata> = [];

  airlineImg: AirlineImg;
  airlines: Array<AirlineImg> = [];
  aLineData:any;
  imgSizeStr:string;

  mostPopularDest = [];
  destinCount = [];
  uniqueFlightCount = [];

  numMorn:number = 0;

  rows = [];
  reorderable = true;
  loadingIndicator = true;

  columns = [
    { prop: 'airlineImg', name: "Airline" },
    { prop: 'journey', name: "Travelling?"},
    { prop: 'time_airline', name: "Flight Time"},
  ]

  constructor(private flightServ:FlightService,
              private iataServ: IataService,
              private aLineServ: AirlinesService) { }

  ngOnInit(): void {
    this.getIataCodes();
    this.getAirlines();
    /* before retrieving the flightData ensure we have the iata codes and airlines - giving the functions a extra 5 seconds to complete */
    setTimeout (() => {
      this.getFlightData();
    },10000);
  }

  
  getAirlines(){
    return this.aLineServ.getAirlines()
    .subscribe((data:any) => {
      data.forEach(item => {
        this.airlineImg = new AirlineImg(item.name, item.imgName, parseInt(item.height), parseInt(item.width));
        this.airlines.push(this.airlineImg);
      }); 
      this.aLineData = JSON.parse(JSON.stringify(this.airlines)); 
    });
  }

  getIataCodes(){
    return this.iataServ.getCodes()
      .subscribe((data:any) => {
        data.forEach(item => {
          this.iata = new Iata(item.code, item.name);
          this.codes.push(this.iata);
        }); 
        this.iataData = JSON.parse(JSON.stringify(this.codes));
      });
  }

  getFlightData(){
    let max:number = 7306;
    let error: boolean = false;
    return this.flightServ.getFlights(max)
      .subscribe((data:any) => {
        for(let i=0; i<max; i++){
          //reset error flag to false
          error = false;
          let imgSrc:any;
          //only set the imgSrc field if the carrier exists in the data[i] object
          if(data[i].hasOwnProperty("carrier")){
            imgSrc = "../../../assets/img/" + this.getAirlineImg(data[i].carrier) + ".png";
          } else {
            imgSrc = "";
          }

          /* set width height relative to the natural height/width - would need refined if I had more time */
          /*
          if(parseInt(this.aLineData.find(aLine => aLine.name === data[i].carrier).natHeight) < 80 && 
             parseInt(this.aLineData.find(aLine => aLine.name === data[i].carrier).natWidth) < 300){
            this.imgSizeStr = "height='70' width='180'";
          }
          if(parseInt(this.aLineData.find(aLine => aLine.name === data[i].carrier).natHeight) < 130 && 
             parseInt(this.aLineData.find(aLine => aLine.name === data[i].carrier).natWidth) < 160){
            this.imgSizeStr = "height='110' width='50'";
          }
          */

          let airline = "<img src='" + imgSrc + "'/>";

          /* make sure outdeparttime exist in data object */
          let outTime:any;
          if(data[i].hasOwnProperty("outdeparttime")){ 
            outTime = data[i].outdeparttime;
            /* if time is valid run checkMornTime so we can keep a count of how many flights depart in the morning */
            this.checkMornFlight(outTime);
          } else { outTime = ""; }
          /* make sure outarrivaltime exists in object */
          let reTime:any;
          if(data[i].hasOwnProperty("outarrivaltime")){ reTime = data[i].outarrivaltime } else { reTime = ""; }

          
          /* if both times don't exist in object and are blank set error flag to true */
          if(outTime === "" && reTime === ""){
            error = true;
          }
          let time = outTime + " - " + reTime;

          /* make sure depair exists in data object */
          let outbound:any;
 
          if(data[i].hasOwnProperty("depair")){
             outbound = this.getAirportName(data[i].depair);
           } else {
             outbound = "";
           }
          
          /* make sure destination exist in data object */
          let destination:any; 
          if(data[i].hasOwnProperty("destair")){
            destination = this.getAirportName(data[i].destair);
            /* run trackMostPopDest so we can return the 10 most popular destinations */
            this.trackMostPopDest(data[i].destair);
          } else {
            destination = "";
          }

          if(destination === "" && outbound === ""){
            error = true;
          }
          
          /* if either 'outbound' or 'destination' are equal to an empty array the IATA code does not exist in the IATA DB therefore 
             set error flag to true and skip to the next iteration */ 
          if(error === false){
            if(Object.keys(outbound).length === 0 || Object.keys(destination).length === 0){
              error = true;
            }
          }
          
          if(error === false){
            let journey = outbound + "   --->   " + destination;
            this.flight = new Flight(airline, time, journey);
            this.flights.push(this.flight);
          }
        }
       
        /* sort array of destinations by count so we can output the most popular destinations */
        this.destinCount.sort((a,b) => parseInt(b.count) - parseInt(a.count));
        this.destinCount = this.destinCount.slice(0,10);
        /* loop through the destinCount IATA codes, convert to airport names and append name to mostPopularDest array */
        this.destinCount.forEach(item => {
          this.mostPopularDest.push(this.getAirportName(item.dest));
        });
        
        this.rows = this.flights;
        this.loadingIndicator = false;

      });
    }

    getAirportName(code){
      return(this.iataData.find(iata => iata.code === code) || {}).name || [];
    }

    getAirlineImg(aLineName){
      return(this.aLineData.find(aLine => aLine.name === aLineName) || {}).imgName || [];
    }

    checkMornFlight(time){
      if(parseInt(time.substr(0,2)) < 12){
        this.numMorn = this.numMorn + 1;
      }
    }

    trackMostPopDest(destair){
      if(this.destinCount.find(destin => destin.dest === destair)){
        let itemIndex = this.findIndexCheck(this.destinCount,'dest', destair);
        this.destinCount[itemIndex].count = this.destinCount[itemIndex].count + 1;
        
      } else {
        this.destinCount.push({
          dest: destair,
          count: 1
        });
      }
    }

    findIndexCheck(array, attr, value) {
      for(var i = 0; i < array.length; i += 1) {
          if(array[i][attr] === value) {
              return i;
          }
      }
      return -1;
  }


    
}


