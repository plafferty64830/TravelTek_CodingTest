import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* HttpClientModule so we can make http requests to our MongoDB */
import { HttpClientModule } from '@angular/common/http';

/* services */
import { FlightService } from '../app/services/flight/flight.service';

/* components */
import { AppComponent } from './app.component';
import { AdvSearchComponent } from './views/adv-search/adv-search.component';
import { FlightsComponent } from './views/flights/flights.component';

/* Navigation Module */
import { AppRoutingModule } from './app-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    AppComponent,
    AdvSearchComponent,
    FlightsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxDatatableModule
  ],
  providers: [FlightService],
  bootstrap: [AppComponent]
})

export class AppModule { }
