import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  form!: FormGroup;
  isSubmitted = false;
  valid = true;
  editMode = false;
  userPramId = '';
  showPass = false;
  breakpoint!: {
    cols: number,
    ration: string,
    phoneSize: boolean,
  };

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
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
      this.valid = false;
      return;
    }

    this.valid = true;

    const user: User = {
      id: this.userPramId,
      name: this.userForm['name'].value,
      email: this.userForm['email'].value,
      code: this.userForm['code'].value,
      notes: this.userForm['notes'].value,
      chifer: this.userForm['chifer'].value,
      password: this.userForm['password'].value,
      phone: this.userForm['phone'].value,
      isAdmin: this.userForm['isAdmin'].value,
      address: this.userForm['address'].value,
      bank: this.userForm['bank'].value,
      compt: this.userForm['compt'].value,
    };
    if (this.editMode) {
      this._updateUser(user);
    } else {
      this._createUser(user);
    }
  }

  // method for creating a ctegory
  private _createUser(user: User) {
    // creating ...
    this.usersService.createUser(user).subscribe(
      (user: User) => {
        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Success',
        //   detail: `User ${user.name} was greated!`,
        // });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      }
    );
  }

  // method for updating a specific user
  private _updateUser(user: User) {
    // Updating ...
    this.usersService.updateUser(user, this.userPramId).subscribe(
      (user: User) => {
        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Success',
        //   detail: `User ${user.name} was updated!`,
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
      password: ['', Validators.required],
      email: ['', Validators.required],
      code: ['', Validators.required],
      phone: ['', Validators.required],
      isAdmin: [false, Validators.required],
      notes: [''],
      chifer: [''],
      address: [''],
      bank: [''],
      compt: [''],
      currency: [''],
    });
  }
  // method for cheching if an id was passed so that a user get updated

  private _checkEditMode() {
    // some code
    this.route.params.subscribe((pararms) => {
      if (pararms['id']) {
        this.userPramId = pararms['id'];
        this.editMode = true;
        this.usersService.getSingleUser(pararms['id']).subscribe((user) => {
          this.userForm['name'].setValue(user.name);
          this.userForm['email'].setValue(user.email);
          this.userForm['code'].setValue(user.code);
          this.userForm['notes'].setValue(user.notes);
          this.userForm['chifer'].setValue(user.chifer);
          this.userForm['phone'].setValue(user.phone);
          this.userForm['isAdmin'].setValue(user.isAdmin);
          this.userForm['address'].setValue(user.address);
          this.userForm['bank'].setValue(user.bank);
          this.userForm['compt'].setValue(user.compt);

          this.userForm['password'].setValidators([]);
          this.userForm['password'].updateValueAndValidity();
        });
      }
    });
  }

  showPassword() {
    this.showPass = !this.showPass;
  }

  onResize(event: any) {
    this.breakpoint.cols = (event.target.innerWidth <= 760) ? 2 : 6;
    this.breakpoint.ration = (event.target.innerWidth <= 760) ? '1:0.5' : '2:1';
    this.breakpoint.phoneSize = (event.target.innerWidth <= 760)
  }

  // refactoring for getting the form controls
  get userForm() {
    return this.form.controls;
  }
}
