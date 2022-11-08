import { Component, Input, OnInit } from '@angular/core';
import { Facture } from 'src/app/models/facture';
import { MONTHS } from 'src/app/models/months';
import { Transaction } from 'src/app/models/transaction';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-facture-item',
  templateUrl: './facture-item.component.html',
  styleUrls: ['./facture-item.component.scss']
})
export class FactureItemComponent implements OnInit {
  @Input() facture!: Facture;
  @Input() admin!: boolean;
  transactions!: Transaction[];
  @Input() isLTA!: boolean;
  months = [...MONTHS];
  montant!: number;

  constructor(
    private transactionService: TransactionsService
  ) { }

    ngOnInit(): void {
      this.getTransactions();
    }

  getTransactions() {

    this.transactionService.getTransactionByName(this.facture.id)
      .subscribe((res) => {
        this.transactions = res;
        res.forEach((item) => {
          this.montant += item.price;
        })
      })
  }

  delete(id: string) {

  }

}
