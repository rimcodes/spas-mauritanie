import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
      canActivate: [AuthGuard],
      children: [
        {
          path: '',
          loadChildren: () =>
            import('./pages/dashboard/dashboard.module').then(
              (m) => m.DashboardModule
            ),
        },
        {
          path: 'rc-admin',
          loadChildren: () =>
            import('./pages/admin/admin.module').then((m) => m.AdminModule),
        },
        {
          path: 'dashboard',
          loadChildren: () =>
            import('./pages/dashboard/dashboard.module').then(
              (m) => m.DashboardModule
            ),
        },
        {
          path: 'factures',
          loadChildren: () =>
            import('./pages/factures/factures.module').then((m) => m.FacturesModule),
          },
            // {path: '404', component: NotFoundComponent},
            // {path: '**', redirectTo: '/404'}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
