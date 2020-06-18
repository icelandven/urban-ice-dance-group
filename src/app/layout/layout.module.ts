import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { LayoutComponent } from './layout.component';
import {AdminAuthGuardService, AuthGuardService} from '@MasServices/auth.service';

const LAYOUTS_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'pages',
        loadChildren: () => import('../pages/pages.module').then(m => m.PagesModule),
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'admin-pages',
        loadChildren: () => import('../admin-pages/admin-pages.module').then(m => m.AdminPagesModule),
        canActivate: [ AdminAuthGuardService ],
      },
      {
        path: '**',
        redirectTo: 'pages/home',
      },
    ]
  },
];

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(LAYOUTS_ROUTES)
  ]
})
export class LayoutModule { }
