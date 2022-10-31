import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userId!: string | null;
  user$!: Observable<User>;

  constructor(
    private localStorage: LocalstorageService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.userId = this.localStorage.getUserId();
    this.getUserDetails(this.userId);
  }

  private getUserDetails(id: string | null) {
    if(!id) return;

    this.user$ = this.usersService.getSingleUser(id);
  }

}
