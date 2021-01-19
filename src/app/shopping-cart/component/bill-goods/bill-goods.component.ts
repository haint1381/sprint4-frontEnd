import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from '../../service/shopping-cart.service';
import {Goods} from '../../model/goods.class';
import {GoodsCart} from '../../model/goods-cart';
import {TokenStorageService} from '../../../page-common/service/token-storage/token-storage.service';

@Component({
  selector: 'app-list-cart',
  templateUrl: './bill-goods.component.html',
  styleUrls: ['./bill-goods.component.css']
})
export class BillGoodsComponent implements OnInit {
  public listGoodsCart: GoodsCart[] = [];
  public totalMoney = 0;
  public goodsCart: GoodsCart;

  constructor(private shoppingCartService: ShoppingCartService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getUser() != null) {
      this.shoppingCartService.getAllGoodsCart(this.tokenStorageService.getUser().username).subscribe(next => {
        this.listGoodsCart = next;
      });
    }else {
      // vãng lai
      this.shoppingCartService.getCartSession().subscribe(next => {
        this.listGoodsCart = next;
        if (this.listGoodsCart == null) {
          this.listGoodsCart = [];
        }
      });
    }
  }


  formatCash(str): void {
    return str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + '.')) + prev;
    });
  }

  setQuantityCart(value: string, idGoodsCart: number): void {
    for (const element of this.listGoodsCart) {
      if (idGoodsCart == element.idGoodsCart) {
        if (element.totalQuantity >= Number(value)) {
          element.checkQuantity = true;
          element.quantityCart = Number(value);
          this.shoppingCartService.findBy(element.idGoods).subscribe(data => {
            this.goodsCart = data;
          }, () => {
          }, () => {
            this.goodsCart.quantityCart = Number(value);
            this.shoppingCartService.updateCart(this.goodsCart, String(this.goodsCart.idGoodsCart)).subscribe(data => {
            });
          });
        } else {
          element.checkQuantity = false;
        }
      }
    }
  }

  deleteGoodsCart(idGoodsCart: number): void {
    this.shoppingCartService.resetCart(idGoodsCart).subscribe(next => {
      this.ngOnInit();
    });
  }

  checkout(): void {
    this.totalMoney = 0;
    for (const element of this.listGoodsCart) {
      this.totalMoney += (element.quantityCart * element.price) - ((element.quantityCart * element.price) * element.saleOff / 100);
    }
  }
}
