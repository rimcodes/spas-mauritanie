import { Component, Input, OnInit } from '@angular/core';
import { Facture } from 'src/app/models/facture';
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
  isLTA = false;
  months = [
    {
      name: "يناير",
      number: 1
    },
    {
      name: "فبراير",
      number: 2
    },
    {
      name: "مارس",
      number: 3
    },
    {
      name: "ابريل",
      number: 4
    },
    {
      name: "مايو",
      number: 5
    },
    {
      name: "يونيو",
      number: 6
    },
    {
      name: "يوليو",
      number: 7
    },
    {
      name: "اغسطس",
      number: 8
    },
    {
      name: "سبتمبر",
      number: 9
    },
    {
      name: "اكتوبر",
      number: 10
    },
    {
      name: "نوفمبر",
      number: 11
    },
    {
      name: "ديسمبر",
      number: 12
    }
  ];
  montant!: number;

  constructor(
    private transactionService: TransactionsService,
  ) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions() {
    this.transactionService.getTransactionByName(this.facture.id)
      .subscribe((res) => {
        this.transactions = res;
        this.isLTA = res[0]?.facture.type === 'LTA';
        res.forEach((item) => {
          this.montant += item.price;
        })
      })
  }

}
