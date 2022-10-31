import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  months = [
    {
      name: "يناير",
      number: 1,
      active: false
    },
    {
      name: "فبراير",
      number: 2,
      active: false
    },
    {
      name: "مارس",
      number: 3,
      active: false
    },
    {
      name: "ابريل",
      number: 4,
      active: false
    },
    {
      name: "مايو",
      number: 5,
      active: false
    },
    {
      name: "يونيو",
      number: 6,
      active: false
    },
    {
      name: "يوليو",
      number: 7,
      active: false
    },
    {
      name: "اغسطس",
      number: 8,
      active: false
    },
    {
      name: "سبتمبر",
      number: 9,
      active: false
    },
    {
      name: "اكتوبر",
      number: 10,
      active: false
    },
    {
      name: "نوفمبر",
      number: 11,
      active: false
    },
    {
      name: "ديسمبر",
      number: 12,
      active: false
    }
  ];
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
