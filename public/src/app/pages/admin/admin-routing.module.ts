import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/services/admin.guard';
import { FacturesComponent } from './pages/factures/factures.component';
import { LoginComponent } from '../login/login.component';
import { AdminComponent } from './admin.component';
import { FactureFormComponent } from './pages/factures/facture-form/facture-form.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { TransactionsFormComponent } from './pages/transactions/transactions-form/transactions-form.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: AdminComponent
      },
      {
        path: 'factures/form',
        component: FactureFormComponent
      },
      {
        path: 'factures/form/:id',
        component: FactureFormComponent
      },
      {
        path: 'users/form',
        component: UserFormComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'users/:id',
        component: UsersComponent
      },
      {
        path: 'users/form/:id',
        component: UserFormComponent
      },
      {
        path: 'transactions',
        component: TransactionsComponent
      },
      {
        path: 'transactions/form',
        component: TransactionsFormComponent
      },
      {
        path: 'transactions/form/:id',
        component: TransactionsFormComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
