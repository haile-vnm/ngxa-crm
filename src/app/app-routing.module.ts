import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { authenticationGuard } from './core/guards/authentication.guard';
const routes: Routes = [
  {
    path: '', pathMatch: 'full',
    redirectTo: '/users'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'users',
    canActivate: [authenticationGuard],
    loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
