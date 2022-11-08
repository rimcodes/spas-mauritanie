import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Facture } from 'src/app/models/facture';
import { Transaction } from 'src/app/models/transaction';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialog-overview',
  templateUrl: './dialog-overview.component.html',
  styleUrls: ['./dialog-overview.component.scss']
})
export class DialogOverviewComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User | Facture | Transaction,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(userId: string) {
    this.usersService.deleteUser(userId)
      .subscribe((res) => {
        this.dialogRef.close()
      })
  }

}
