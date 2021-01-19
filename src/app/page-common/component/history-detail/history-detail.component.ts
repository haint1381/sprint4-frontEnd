import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GoodsCart} from '../../../shopping-cart/model/goods-cart';
import {User} from '../../model/User';
import {TokenStorageService} from '../../service/token-storage/token-storage.service';
import {AuthenticationService} from '../../service/auth/authentication.service';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.css']
})
export class HistoryDetailComponent implements OnInit {
  public goodsBill: GoodsCart[] = [];
  public totalMoney = 0;
  public user: User;

  constructor(
    public dialogRef: MatDialogRef<HistoryDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tokenStorageService: TokenStorageService,
    private authenticationService: AuthenticationService,
  ) {
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getUser() != null) {
      this.authenticationService.findByUser(this.tokenStorageService.getUser().username).subscribe( data => {
        this.user = data;
      });
      this.goodsBill = this.data.data1;
      this.totalMoney = 0;
      for (const element of this.goodsBill) {
        this.totalMoney += (element.price * element.quantityCart - element.price * element.saleOff * element.quantityCart / 100);
      }
      console.log(this.goodsBill);
    }
  }

  formatCash(str): void {
    return str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + '.')) + prev;
    });
  }
}
