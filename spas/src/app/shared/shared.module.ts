import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactureItemComponent } from './facture-item/facture-item.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionItemComponent } from './transaction-item/transaction-item.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { LoadingComponent } from './loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TablesComponent } from './tables/tables.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FactureItemComponent,
    TransactionsComponent,
    TransactionItemComponent,
    ToolBarComponent,
    DashboardComponent,
    LoadingComponent,
    TablesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  exports: [
    FactureItemComponent,
    TransactionsComponent,
    TransactionItemComponent,
    ToolBarComponent,
    DashboardComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
