import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../../page-common/model/User';
import {ShoppingCartService} from '../../service/shopping-cart.service';
import {TokenStorageService} from '../../../page-common/service/token-storage/token-storage.service';
import {ToastrService} from 'ngx-toastr';
import {CheckOutComponent} from '../check-out/check-out.component';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.css']
})
export class OrderConfirmComponent implements OnInit {
  public dd;
  public mm;
  public yyyy;
  public time = 5;
  interval;
  public user: User;
  constructor(
    private dialog: MatDialog,
    private shoppingCartService: ShoppingCartService,
    private tokenStorageService: TokenStorageService,
    private toast: ToastrService,
    public dialogRef: MatDialogRef<OrderConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.shoppingCartService.checkSendMail = true;
    this.user = this.data.data1;
    this.time = 5;
    const today = new Date();
    this.dd = String(today.getDate()).padStart(2, '0');
    this.mm = String(today.getMonth() + 1).padStart(2, '0');
    this.yyyy = today.getFullYear();
    this.interval = setInterval(() => {
      if (this.time > 0) {
        this.time--;
      } else if (this.time < 0) {
        console.log('đoạn này đặt hàng');
      }
    }, 1000);
  }

  payMoney(): void {
    if (this.tokenStorageService.getUser() != null) {
      this.shoppingCartService.checkSendMail = false;
      this.dialog.closeAll();
      this.shoppingCartService.payMoney(this.tokenStorageService.getUser().username).subscribe(data => {
        if (data == true) {
          this.shoppingCartService.checkSendMail = true;
          this.toast.success('Thanh toán thành công.', 'Thông báo');
          setTimeout(() => {
            this.reloadPage();
          }, 1000);
        }
      });
    } else {
      // vãng lai
      this.dialog.closeAll();
      this.shoppingCartService.checkSendMail = false;
      this.shoppingCartService.payMoneyAnonymous(this.user).subscribe(data => {
        if (data == true) {
          this.shoppingCartService.checkSendMail = true;
          this.reloadPage();
          this.toast.success('Thanh toán thành công.', 'Thông báo');
        }
      });
    }
  }
  reloadPage(): void {
    window.location.reload();
  }
}
