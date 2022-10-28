import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Facture } from 'src/app/models/facture';
import { Transaction } from 'src/app/models/transaction';
import { FacturesService } from 'src/app/services/factures.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'shared-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() cards!: Observable<Facture[]>;

  // Improve reusabiltity
  @Input() admin!: boolean;

  transactions!: Observable<Transaction[]>;

  constructor(private facturesService: FacturesService, private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.cards = this.facturesService.getFactures();
  }

  getTransactions(factureId: string) {
    this.transactions = this.transactionsService.getTransactionByName(factureId);
  }
}
