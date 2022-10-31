import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Facture } from 'src/app/models/facture';
import { User } from 'src/app/models/user';
import { FacturesService } from 'src/app/services/factures.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users!: Observable<User[]>;
  factures$!: Observable<Facture[]>;
  breakpoint!: boolean;

  constructor(
    private usersService: UsersService,
    private facturesService: FacturesService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.factures$ = this.facturesService.getFactures();
    this.breakpoint = (window.innerWidth <= 760)
  }

  getUsers() {
    this.users = this.usersService.getUsers();
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 760);
  }

}
