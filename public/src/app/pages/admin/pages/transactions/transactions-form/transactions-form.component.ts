import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { Observable, timer } from 'rxjs';
import { Facture } from 'src/app/models/facture';
import { FacturesService } from 'src/app/services/factures.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { Transaction } from 'src/app/models/transaction';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-transactions-form',
  templateUrl: './transactions-form.component.html',
  styleUrls: ['./transactions-form.component.scss']
})
export class TransactionsFormComponent implements OnInit {
  factureType!: string;
  isLTA = false;
  form!: FormGroup;
  isSubmitted = false;
  valid = true;
  editMode = false;
  pramId = '';
  breakpoint!: {
    cols: number,
    ration: string,
    phoneSize: boolean,
  }
  factures!: Observable<Facture[]>
  user!: User;
  userId!: string;
  oldPrice!: number;

  constructor(
    private formBuilder: FormBuilder,
    private facturesService: FacturesService,
    private transactionsService: TransactionsService,
    private usersService: UsersService,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this._initForm();
    this.getFactures();
    this._checkEditMode();
    this.breakpoint = {
      cols: (window.innerWidth <= 760) ? 2 : 6,
      ration: (window.innerWidth <= 760) ? '1:0.3' : '2:1',
      phoneSize: (window.innerWidth <= 760)
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      this.valid = false;
      return;
    }

    this.valid = true;

    const transactionFormData = new FormData();

    Object.keys(this.transactionForm).map((key) => {
      transactionFormData.append(key, this.transactionForm[key].value);
    })

    if (this.editMode) {
      this.updateTransaction(transactionFormData);
      this.user.chifer += this.transactionForm['price'].value - this.oldPrice;
    } else {
      this.createTransaction(transactionFormData);
      this.user.chifer += this.transactionForm['price'].value
    }

    this.updateUserChifer()
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
      truckNumber: [''],
      conducteur: [''],
      date: [new Date()],
      destination: [''],
      price: ['', Validators.required],
      facture: ['', Validators.required],
      quantity: ['', Validators.required],
      prixUnitaire: [''],
      nature: [''],
      payment: [''],
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
            this.transactionForm['truckNumber'].setValue(res.truckNumber);
            this.transactionForm['conducteur'].setValue(res.conducteur);
            this.transactionForm['date'].setValue(new Date(res.date ?? ''));
            this.transactionForm['destination'].setValue(res.destination);
            this.transactionForm['price'].setValue(res.price);

            // Specific logic for chifer price
            this.oldPrice = res.price;
            this.changeFormType(res.facture);

            this.transactionForm['facture'].setValue(res.facture.id);
            this.transactionForm['quantity'].setValue(res.quantity);
            this.transactionForm['prixUnitaire'].setValue(res.prixUnitaire);
            this.transactionForm['nature'].setValue(res.nature);
            this.transactionForm['payment'].setValue(res.payment);
          });


      }
    });
  }

  // updating the chifer field in the user object (special request by the client)
  private updateUserChifer() {

    this.usersService.updateUser(this.user, this.user.id)
      .subscribe((user) => { this.user = user });

  }


  private getFactures() {
    this.factures = this.facturesService.getFactures();
  }

  changeFormType(facture: Facture) {
    // Getting the user id on every change for updating the chifer field
    this.user = facture.user;
    console.log(facture.user);

    this.userId = facture.user.id;
    this.oldPrice = facture.user.chifer;
    if (facture.type !== this.factureType) {
      this.factureType = facture.type;
      switch(this.factureType) {
        case 'LTA': {
          this.isLTA = true;
          break;
        }
        case 'TM': {
          break;
        }
        case 'TR': {
          this.isLTA = false;
          break;
        }
        default: {
          this.isLTA = false;
          break;
        }
      }
    }



  }

  onResize(event: any) {
    this.breakpoint.cols = (event.target.innerWidth <= 760) ? 2 : 6;
    this.breakpoint.ration = (event.target.innerWidth <= 760) ? '1:0.3' : '2:1';
    this.breakpoint.phoneSize = (event.target.innerWidth <= 760)
  }


  // refactoring for getting the form controls
  get transactionForm() {
    return this.form.controls;
  }

}
