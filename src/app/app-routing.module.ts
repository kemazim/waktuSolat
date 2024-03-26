import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrayertimeComponent } from './component/prayertime/prayertime.component';

const routes: Routes = [
  {
    path: '',
    component: PrayertimeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
