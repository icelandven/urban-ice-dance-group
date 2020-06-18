import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import {RouterModule, Routes} from '@angular/router';
import {CoreModule} from '@MasModules/core/core.module';

const HOME_ROUTERS: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    // resolve: {}
  },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CoreModule,
    RouterModule.forChild(HOME_ROUTERS),
  ]
})
export class HomeModule { }
