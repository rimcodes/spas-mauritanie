import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Facture } from 'src/app/models/facture';
import { MONTHS } from 'src/app/models/months';
import { User } from 'src/app/models/user';
import { FacturesService } from 'src/app/services/factures.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  searchForm = new FormControl<string | User>('');
  users$!: Observable<User[]>;
  users!: User[];
  factures$!: Observable<Facture[]>;
  breakpoint!: boolean;
  months = MONTHS;

  constructor(
    private usersService: UsersService,
    private facturesService: FacturesService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.factures$ = this.facturesService.getFactures();
    this.breakpoint = (window.innerWidth <= 760);

  }

  getUsers() {
    this.usersService.getUsers()
      .subscribe((res) => {
        this.users = res;
        this.users$ = this.searchForm.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.name;
            return name ? this._filter(name as string) : this.users.slice();
          }),
        );
      })
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 760);
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.users.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  //Filtering based on month
  monthSelected(month: number) {
    this.factures$ = this.facturesService.getfilteredFactures('', month);
    this.months[month-1].active =!this.months[month-1].active
  }

}
