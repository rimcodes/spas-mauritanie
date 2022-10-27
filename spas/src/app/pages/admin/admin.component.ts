import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users!: Observable<User[]>;
  breakpoint!: boolean;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.getUsers()
    this.breakpoint = (window.innerWidth <= 760)
  }

  getUsers() {
    this.users = this.usersService.getUsers();
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 760);
  }

}
