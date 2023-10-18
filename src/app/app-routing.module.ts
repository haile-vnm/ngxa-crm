import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { authenticationGuard } from './core/guards/authentication.guard';
import { AuthenticatedComponent } from './pages/authenticated/authenticated.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    canActivate: [authenticationGuard],
    component: AuthenticatedComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/users'
      },
      {
        path: 'users',
        loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
