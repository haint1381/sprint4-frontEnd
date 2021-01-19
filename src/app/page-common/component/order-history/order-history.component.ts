import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/auth/authentication.service';
import {TokenStorageService} from '../../service/token-storage/token-storage.service';
import {Bill} from '../../model/bill.class';
import {GoodsCart} from '../../../shopping-cart/model/goods-cart';
import {MatDialog} from '@angular/material/dialog';
import {HistoryDetailComponent} from '../history-detail/history-detail.component';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  public listBill: Bill[] = [];
  public goodsBill: GoodsCart[] = [];

  constructor(private authenticationService: AuthenticationService,
              private tokenStorageService: TokenStorageService,
              private dialog: MatDialog,
              ) {
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getUser() != null) {
      this.authenticationService.getBillUser(this.tokenStorageService.getUser().username).subscribe(data => {
        this.listBill = data;
      });
    }
  }

  getBillDetail(idBill: number): void {
    this.authenticationService.getBillDetail(idBill).subscribe(data => {
      this.goodsBill = data;
      console.log(data);
    }, () => {
    }, () => {
      const dialogRef = this.dialog.open(HistoryDetailComponent, {
        panelClass: 'app-full-bleed-dialog',
        width: '750px',
        data: {data1: this.goodsBill},
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    });
  }
}
