import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ShoppingCartService} from '../../service/shopping-cart.service';
import {GoodsCart} from '../../model/goods-cart';
import {TokenStorageService} from '../../../page-common/service/token-storage/token-storage.service';
import {User} from '../../../page-common/model/User';
import {AuthenticationService} from '../../../page-common/service/auth/authentication.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {HistoryDetailComponent} from '../../../page-common/component/history-detail/history-detail.component';
import {OrderConfirmComponent} from '../order-confirm/order-confirm.component';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  public listGoodsCart: GoodsCart[] = [];
  public totalMoney = 0;
  public user: User;
  public formUser: FormGroup;
  public checkSendMail;

  constructor(private shoppingCartService: ShoppingCartService,
              private tokenStorageService: TokenStorageService,
              private toast: ToastrService,
              private fb: FormBuilder,
              private dialog: MatDialog) {
  }

  @ViewChild('paypalRef', {static: true}) private paypalRef: ElementRef;

  ngOnInit(): void {
    this.checkSendMail = this.shoppingCartService.checkSendMail;
    if (this.tokenStorageService.getUser() != null) {
      this.user = this.tokenStorageService.getUser();
      console.log(this.checkSendMail);
      this.shoppingCartService.getAllGoodsCart(this.tokenStorageService.getUser().username).subscribe(next => {
        this.listGoodsCart = next;
      }, () => {
      }, () => {
        this.totalMoney = 0;
        for (const element of this.listGoodsCart) {
          this.totalMoney += (element.quantityCart * element.price) - ((element.quantityCart * element.price) * element.saleOff / 100);
        }
      });
      this.shoppingCartService.findByUser(this.tokenStorageService.getUser().username).subscribe(next => {
        this.user = next;
        console.log(this.user);
      });
    } else {
      // vãng lai
      this.user = new User();
      console.log(this.user.idUser);
      this.shoppingCartService.getCartSession().subscribe(next => {
        this.listGoodsCart = next;
        if (this.listGoodsCart == null) {
          this.listGoodsCart = [];
        }
      }, () => {
      }, () => {
        this.totalMoney = 0;
        for (const element of this.listGoodsCart) {
          this.totalMoney += (element.quantityCart * element.price) - ((element.quantityCart * element.price) * element.saleOff / 100);
        }
      });
    }
    this.formUser = this.fb.group({
      fullName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required]]
    });
    // payPal
    paypal.Buttons(
      {
        style: {
          shape: 'rect',
          color: 'gold',
          layout: 'horizontal',
          label: 'paypal',
          tagline: true,
          height: 50
        },
        createOrder: (data, actions) => {
          // console.log('createOrder');
          // This function sets up the details of the transaction,
          // including the amount and line item details
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.totalMoney,
                  currency_code: 'USD'
                }
              }
            ]
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then(details => {
            console.log('Transaction completed');
          });
        },
        onError: (data, actions) => {
          console.log('Transaction error');
          // @ts-ignore
          $('#refreshData').click();
        }

      }
    ).render(this.paypalRef.nativeElement);
  }

  formatCash(str): void {
    return str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + '.')) + prev;
    });
  }

  startTimer(): void {
    if (this.tokenStorageService.getUser() != null) {
      const dialogRef = this.dialog.open(OrderConfirmComponent, {
        panelClass: 'app-full-bleed-dialog',
        width: '750px',
        data: {data1: this.user},
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    } else {
      this.formUser.markAllAsTouched();
      if (this.formUser.valid) {
        this.user.fullName = this.formUser.value.fullName;
        this.user.phoneNumber = this.formUser.value.phoneNumber;
        this.user.address = this.formUser.value.address;
        this.user.email = this.formUser.value.email;
        const dialogRef = this.dialog.open(OrderConfirmComponent, {
          panelClass: 'app-full-bleed-dialog',
          width: '500px',
          data: {data1: this.user},
          disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
          this.ngOnInit();
        });
      } else {
        console.log('aaaa');
      }
    }
  }

}
