import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './pages/users/users.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { FactureFormComponent } from './pages/factures/facture-form/facture-form.component';
import { FacturesComponent } from './pages/factures/factures.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { TransactionsFormComponent } from './pages/transactions/transactions-form/transactions-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogOverviewComponent } from './dialog-overview/dialog-overview.component';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AdminToolbarComponent } from './admin-toolbar/admin-toolbar.component';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    UserFormComponent,
    FactureFormComponent,
    FacturesComponent,
    TransactionsComponent,
    TransactionsFormComponent,
    DialogOverviewComponent,
    AdminToolbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    AdminRoutingModule,
    MatButtonModule,
    SharedModule,
    MatTabsModule,
    MatGridListModule,
    MatCardModule,
    MatSlideToggleModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatChipsModule
  ]
})
export class AdminModule { }
