import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CustomerComponent } from './components/customer/customer.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
  path:'hotels',
  component : HotelsComponent,
},
{   path: 'customer',
component: CustomerComponent,
canActivate: [AuthGuardService]
},
{
  path: 'login',
  component: LoginComponent,
},
{
  path: 'admin',
  component: AdminComponent,
  canActivate: [AuthGuardService]
},
{
  path: '',
  redirectTo: 'hotels',
  pathMatch: 'full',
},
// {
//   path: '404',
//   component: NotFoundComponent,
// },
{
  path: '**',
  redirectTo: '/404',
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
