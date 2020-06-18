import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminAuthGuardService, AuthGuardService} from '@MasServices/auth.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthGuardService,
    AdminAuthGuardService,
  ]
})
export class ServiceModule { }
