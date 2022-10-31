import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { Location } from "@angular/common";
import { FacturesService } from 'src/app/services/factures.service';
import { Facture } from 'src/app/models/facture';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-facture-form',
  templateUrl: './facture-form.component.html',
  styleUrls: ['./facture-form.component.scss']
})
export class FactureFormComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  editMode = false;
  pramId = '';
  breakpoint!: {
    cols: number,
    ration: string,
    phoneSize: boolean,
  }
  users!: Observable<User[]>;
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
  ]

  constructor(
    private formBuilder: FormBuilder,
    private facturesService: FacturesService,
    private location: Location,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this._initForm();
    this.getUsers();
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

    const factureFormData = new FormData();

    Object.keys(this.factureForm).map((key) => {
      factureFormData.append(key, this.factureForm[key].value);
    })

    if (this.editMode) {
      this.updateFacture(factureFormData);
    } else {
      this.createFacture(factureFormData);
    }
  }

  // method for creating a ctegory
  private createFacture(facture: FormData) {
    // creating ...
    this.facturesService.createFacture(facture).subscribe(
      (facture: Facture) => {
        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Success',
        //   detail: `Facture ${facture.name} was greated!`,
        // });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      }
    );
  }

  // method for updating a specific facture
  private updateFacture(facture: FormData) {
    // Updating ...
    this.facturesService.updateFacture(facture, this.pramId).subscribe(
      (facture: Facture) => {
        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Success',
        //   detail: `Facture ${facture.name} was updated!`,
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
      user: ['', Validators.required],
      month: ['', Validators.required],
      number: ['', Validators.required],
      recite: ['', Validators.required],
      type: ['' , Validators.required],
    });
  }
  // method for cheching if an id was passed so that a facture get updated

  private _checkEditMode() {
    // some code
    this.route.params.subscribe((pararms) => {
      if (pararms['id']) {
        this.pramId = pararms['id'];
        this.editMode = true;
        this.facturesService.getSingleFacture(pararms['id']).subscribe((facture) => {
          this.factureForm['name'].setValue(facture.name);
          this.factureForm['user'].setValue(facture.user);
          this.factureForm['month'].setValue(facture.month);
          this.factureForm['number'].setValue(facture.number);
          this.factureForm['recite'].setValue(facture.recite);

        });
      }
    });
  }

  private getUsers() {
    this.users = this.usersService.getUsers();
  }

  onResize(event: any) {
    this.breakpoint.cols = (event.target.innerWidth <= 760) ? 2 : 6;
    this.breakpoint.ration = (event.target.innerWidth <= 760) ? '1:0.5' : '2:1';
    this.breakpoint.phoneSize = (event.target.innerWidth <= 760)
  }

  // refactoring for getting the form controls
  get factureForm() {
    return this.form.controls;
  }

}
