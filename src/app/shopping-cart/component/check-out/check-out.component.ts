import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from '../../service/shopping-cart.service';
import {GoodsCart} from '../../model/goods-cart';
import {TokenStorageService} from '../../../page-common/service/token-storage/token-storage.service';
import {User} from '../../../page-common/model/User';
import {AuthenticationService} from '../../../page-common/service/auth/authentication.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  public listGoodsCart: GoodsCart[] = [];
  public totalMoney = 0;
  public time = 5;
  interval;
  public user: User;
  public dd;
  public mm;
  public yyyy;
  constructor(private shoppingCartService: ShoppingCartService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getUser() != null) {
      this.user = this.tokenStorageService.getUser();
      this.shoppingCartService.getAllGoodsCart(this.tokenStorageService.getUser().username).subscribe(next => {
        this.listGoodsCart = next;
      }, () => {
      }, () => {
        for (const element of this.listGoodsCart) {
          this.totalMoney += (element.quantityCart * element.price) - ((element.quantityCart * element.price) * element.saleOff / 100);
        }
      });
      this.shoppingCartService.findByUser(this.tokenStorageService.getUser().username).subscribe(next => {
        this.user = next;
        console.log(this.user);
      });
    }
  }

  formatCash(str): void {
    return str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + '.')) + prev;
    });
  }

  startTimer(): void {
    this.time = 5;
    const today = new Date();
    this.dd = String(today.getDate()).padStart(2, '0');
    this.mm = String(today.getMonth() + 1).padStart(2, '0');
    this.yyyy = today.getFullYear();
    this.interval = setInterval(() => {
      if (this.time > 0) {
        this.time --;
      } else if (this.time < 0) {
        console.log('đoạn này đặt hàng');
      }
    }, 1000);
  }
}
