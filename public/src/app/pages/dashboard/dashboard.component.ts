import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MONTHS } from 'src/app/models/months';
import { FacturesService } from 'src/app/services/factures.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  breakpoint!: {
    cols: number,
    ration: string,
    phoneSize: boolean,
  };
  months = MONTHS;
  activeMonths!: any[];
  useId!: string | null;

  constructor(
    private facturesService: FacturesService,
    private localStorage: LocalstorageService,
  ) { }

  ngOnInit(): void {
    this.useId = this.localStorage.getUserId();
    this.breakpoint = {
      cols: (window.innerWidth <= 760) ? 2 : 3,
      ration: (window.innerWidth <= 760) ? '1:0.5' : '2:1',
      phoneSize: (window.innerWidth <= 760)
    }

    this.getActiveMonths(this.useId)
  }

  getActiveMonths(userId: string | null) {
    if (!userId) {
      return;
    }
    this.facturesService.getActiveMonths(userId)
      .subscribe((res) => {
        res.forEach((item) => {
          this.months.forEach((month) => {
            if (month.number === +item) {
              month.active = true;
            }
          })
        })
      })
  }

}
