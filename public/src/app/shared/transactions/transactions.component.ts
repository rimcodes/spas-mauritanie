import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Transaction } from 'src/app/models/transaction';
import { TransactionsService } from 'src/app/services/transactions.service';
import { TablesDataSource } from './tables-datasource';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Transaction>;
  dataSource!: TablesDataSource;

  // Customizing to reusabiltiy
  @Input() pageSize = 2;
  @Input() transactions!: Transaction[];
  @Input() admin!: boolean;
  @Input() isLTA!: boolean;

  totalAmount = 0;

  breakpoint = {
    cols: 6,
    ration: '2:1',
    phoneSize: false,
  };

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  //displayedColumns = this.admin ? ['date', 'name', 'quantity', 'number', 'delivery', 'payment', 'delete'] : ['date', 'name', 'quantity', 'number', 'delivery', 'payment'];
  displayedColumns!: string[] ;

  constructor(
    private transactionsService: TransactionsService
  ) {
  }

  ngAfterViewInit(): void {
    this.dataSource = new TablesDataSource(this.transactions);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

    if (!this.admin) {
      this.displayedColumns.pop();
    }

  }

  ngOnInit(): void {
    this.checkFactureType();

    this.breakpoint = {
      cols: (window.innerWidth <= 760) ? 2 : 6,
      ration: (window.innerWidth <= 760) ? '1:0.5' : '2:1',
      phoneSize: (window.innerWidth <= 760)
    }

    this.claculateAmount()

  }

  onResize(event: any) {
    this.breakpoint.cols = (event.target.innerWidth <= 760) ? 2 : 6;
    this.breakpoint.ration = (event.target.innerWidth <= 760) ? '1:0.5' : '2:1';
    this.breakpoint.phoneSize = (event.target.innerWidth <= 760)
  }

  deleteTransaction(id: string) {
    this.transactionsService.deleteTransaction(id)
      .subscribe((res) => {
        console.log("Item deleted");
        this.transactionsService.getTransactions()
          .subscribe((res) => {
            this.transactions = res;
          })
      }, (err) => {
        console.log(err.message);

      })
  }

  private checkFactureType() {
    if (this.isLTA) {
      this.displayedColumns = ['name', 'quantity', 'nature', 'date', 'destination', 'price', 'payment', 'buttons'] ;

    } else {
      this.displayedColumns = ['name', 'truck', 'conducteur', 'quantity', 'nature', 'date', 'perunit', 'price', 'payment', 'buttons'] ;

    }
  }

  // Calculating the total amount in the
  claculateAmount() {
    this.transactions.forEach((el) => {
      this.totalAmount += el.price
    })
  }

}
