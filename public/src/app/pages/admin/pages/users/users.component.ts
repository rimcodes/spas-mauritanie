import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Facture } from 'src/app/models/facture';
import { FacturesService } from 'src/app/services/factures.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  factures$!: Observable<Facture[]>
  admin = true;

  constructor(
    private facturesService: FacturesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if(params['id']) {
        let userId = params['id'];

        this.factures$ = this.facturesService.getFacturesByUser(userId);

      } else {
        this.factures$ = this.facturesService.getFactures();
      }
    })
  }

}
