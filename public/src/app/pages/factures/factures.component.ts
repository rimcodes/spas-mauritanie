import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Facture } from 'src/app/models/facture';
import { FacturesService } from 'src/app/services/factures.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-factures',
  templateUrl: './factures.component.html',
  styleUrls: ['./factures.component.scss']
})
export class FacturesComponent implements OnInit {
  factures$!: Observable<Facture[]>;
  userId!: string | null;
  selectedMonth!: string;

  constructor(
    private route: ActivatedRoute,
    private facturesService: FacturesService,
    private storageService: LocalstorageService
  ) { }

  ngOnInit(): void {
    this.userId = this.storageService.getUserId();
    this.route.params.subscribe((params) => {
      if (params['month'] && this.userId) {
        this.selectedMonth = params['month'];
        this.factures$ = this.facturesService.getfilteredFactures(this.userId, this.selectedMonth);
      } else {
        if (this.userId) {
          this.factures$ = this.facturesService.getFacturesByUser(this.userId);
        }
      }
    })
  }

}
