import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { Observable, timer } from 'rxjs';
import { Facture } from 'src/app/models/facture';
import { FacturesService } from 'src/app/services/factures.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { Transaction } from 'src/app/models/transaction';

@Component({
  selector: 'app-transactions-form',
  templateUrl: './transactions-form.component.html',
  styleUrls: ['./transactions-form.component.scss']
})
export class TransactionsFormComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  editMode = false;
  pramId = '';
  breakpoint!: {
    cols: number,
    ration: string,
    phoneSize: boolean,
  }
  factures!: Observable<Facture[]>

  constructor(
    private formBuilder: FormBuilder,
    private facturesService: FacturesService,
    private transactionsService: TransactionsService,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this._initForm();
    this.getFactures();
    this._checkEditMode();
    this.breakpoint = {
      cols: (window.innerWidth <= 760) ? 2 : 6,
      ration: (window.innerWidth <= 760) ? '1:0.5' : '2:1',
      phoneSize: (window.innerWidth <= 760)
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const transactionFormData = new FormData();

    Object.keys(this.transactionForm).map((key) => {
      transactionFormData.append(key, this.transactionForm[key].value);
    })

    if (this.editMode) {
      this.updateTransaction(transactionFormData);
    } else {
      this.createTransaction(transactionFormData);
    }
  }

  // method for creating a ctegory
  private createTransaction(transaction: FormData) {
    // creating ...
    this.transactionsService.createTransaction(transaction).subscribe(
      (transaction: Transaction) => {
        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Success',
        //   detail: `Facture ${transaction.name} was greated!`,
        // });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      }
    );
  }

  // method for updating a specific transaction
  private updateTransaction(transaction: FormData) {
    // Updating ...
    this.transactionsService.updateTransaction(transaction, this.pramId).subscribe(
      (transaction: Transaction) => {
        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Success',
        //   detail: `Facture ${transaction.name} was updated!`,
        // });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      }
    );
  }

  // enttializing the form
  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      price: ['', Validators.required],
      facture: ['', Validators.required],
      quantity: ['', Validators.required],
      number: ['', Validators.required],
      delivery: [''],
      payment: [false],
    });
  }

  private _checkEditMode() {
    // some code
    this.route.params.subscribe((pararms) => {
      if (pararms['id']) {
        this.pramId = pararms['id'];
        this.editMode = true;
        this.transactionsService.getSingleTransaction(pararms['id'])
          .subscribe((res) => {
            this.transactionForm['name'].setValue(res.name);
            this.transactionForm['description'].setValue(res.description);
            this.transactionForm['price'].setValue(res.price);
            this.transactionForm['facture'].setValue(res.facture);
            this.transactionForm['quantity'].setValue(res.quantity);
            this.transactionForm['number'].setValue(res.number);
            this.transactionForm['delivery'].setValue(res.delivery);
            this.transactionForm['payment'].setValue(res.payment);
          });
      }
    });
  }

  private getFactures() {
    this.factures = this.facturesService.getFactures();
  }

  onResize(event: any) {
    this.breakpoint.cols = (event.target.innerWidth <= 760) ? 2 : 6;
    this.breakpoint.ration = (event.target.innerWidth <= 760) ? '1:0.5' : '2:1';
    this.breakpoint.phoneSize = (event.target.innerWidth <= 760)
  }


  // refactoring for getting the form controls
  get transactionForm() {
    return this.form.controls;
  }

}
