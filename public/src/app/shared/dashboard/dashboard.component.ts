import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Facture } from 'src/app/models/facture';
import { Transaction } from 'src/app/models/transaction';
import { FacturesService } from 'src/app/services/factures.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'shared-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() cards!: Facture[];

  // Improve reusabiltity
  @Input() admin!: boolean;

  transactions!: Observable<Transaction[]>;
  userId!: string | null;

  constructor() {}

  ngOnInit(): void {
  }

}
