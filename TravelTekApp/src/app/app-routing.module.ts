import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* components */
import { FlightsComponent } from '../app/views/flights/flights.component';
import { AdvSearchComponent } from '../app/views/adv-search/adv-search.component';

const routes: Routes = [
  { path: '', redirectTo: '/flights', pathMatch:'full' },
  { path: 'flights', component: FlightsComponent },
  { path: 'advSearch', component: AdvSearchComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
