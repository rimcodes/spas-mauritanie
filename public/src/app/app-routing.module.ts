import { NgModule } from '@angular/core';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
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
          component: HomeComponent
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
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules} )],
  exports: [RouterModule],
})
export class AppRoutingModule { }
