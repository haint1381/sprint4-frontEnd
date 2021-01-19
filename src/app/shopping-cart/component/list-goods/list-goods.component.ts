import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from '../../service/shopping-cart.service';
import {Goods} from '../../model/goods.class';
import {MatDialog} from '@angular/material/dialog';
import {GoodsCart} from '../../model/goods-cart';
import {TokenStorageService} from '../../../page-common/service/token-storage/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../page-common/service/auth/authentication.service';

@Component({
  selector: 'app-list-goods',
  templateUrl: './list-goods.component.html',
  styleUrls: ['./list-goods.component.css']
})
export class ListGoodsComponent implements OnInit {
  public listGoods: Goods[] = [];
  public listGoodsCart: GoodsCart[] = [];
  public goodsCart: GoodsCart;
  public inputSearch = '';

  constructor(private shoppingCartService: ShoppingCartService,
              public dialog: MatDialog,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.inputSearch = this.authenticationService.inputSearch;
    if (this.inputSearch.length == 0) {
      this.shoppingCartService.getAll().subscribe(data => {
        this.listGoods = data;
        console.log(this.listGoods);
        console.log('this.listGoods');
      });
    }else {
      this.shoppingCartService.getByInputSearch(this.inputSearch).subscribe(data => {
        this.listGoods = data;
        console.log(this.listGoods);
      });
    }
    if (this.tokenStorageService.getUser() != null) {
      console.log('oke r');
      this.shoppingCartService.getAllGoodsCart(this.tokenStorageService.getUser().username).subscribe(next => {
        this.listGoodsCart = next;
        if (this.listGoodsCart == null) {
          this.listGoodsCart = [];
        }
      });
    } else {
      //  vãng lai
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

  checkDuplicate(arr: any, element): boolean {
    for (const a of arr) {
      if (a.idGoods == element.idGoods) {
        return false;
      }
    }
    return true;
  }

  shakingEffect(): void {
    const element = document.querySelector('.animatebutton');
    element.classList.add('animated', 'shake');
    setTimeout(() => {
      element.classList.remove('shake');
    }, 1500);
  }

  addToCart(element: Goods): void {
    if (this.tokenStorageService.getUser() != null) {
      if (this.checkDuplicate(this.listGoodsCart, element)) {
        this.shakingEffect();
        // chuyển để lưu giỏ hàng
        this.goodsCart = new GoodsCart();
        this.goodsCart.idGoods = element.idGoods;
        this.goodsCart.goodsName = element.goodsName;
        this.goodsCart.price = element.price;
        this.goodsCart.tradeMark = element.tradeMark;
        this.goodsCart.saleOff = element.saleOff;
        this.goodsCart.priceForSaleOff = element.priceForSaleOff;
        this.goodsCart.image = element.image;
        this.goodsCart.quantityCart = 1;
        this.goodsCart.idGoodsCart = null;
        this.goodsCart.status = true;
        this.goodsCart.totalQuantity = Number(element.quantity);
        this.listGoodsCart.push(this.goodsCart);
        this.shoppingCartService.findByCart(this.tokenStorageService.getUser().username).subscribe(data => {
          this.goodsCart.cart = data;
        }, () => {
        }, () => {
          console.log(this.goodsCart);
          this.shoppingCartService.addToCart(this.goodsCart).subscribe(data => {
            console.log('oke');
          });
        });

      } else {
        console.log('trái');
        this.goodsCart = new GoodsCart();
        this.shakingEffect();
        this.shoppingCartService.findBy(element.idGoods).subscribe(data => {
          this.goodsCart = data;
        }, () => {
        }, () => {
          this.goodsCart.quantityCart++;
          console.log(this.goodsCart);
          this.shoppingCartService.updateCart(this.goodsCart, String(this.goodsCart.idGoodsCart)).subscribe(data => {
            console.log('oke');
          });
        });
      }
    } else {
      //  vãng lai
      this.shakingEffect();
      this.goodsCart = new GoodsCart();
      this.goodsCart.idGoods = element.idGoods;
      this.goodsCart.goodsName = element.goodsName;
      this.goodsCart.price = element.price;
      this.goodsCart.tradeMark = element.tradeMark;
      this.goodsCart.saleOff = element.saleOff;
      this.goodsCart.priceForSaleOff = element.priceForSaleOff;
      this.goodsCart.image = element.image;
      this.goodsCart.quantityCart = 1;
      this.goodsCart.idGoodsCart = null;
      this.goodsCart.status = true;
      this.goodsCart.totalQuantity = Number(element.quantity);
      this.listGoodsCart.push(this.goodsCart);
      this.shoppingCartService.addCartSession(this.goodsCart).subscribe(data => {
        console.log('oke');
      });
    }
  }

  resetCart(): void {
    if (this.tokenStorageService.getUser() != null) {
      this.shoppingCartService.getAllGoodsCart(this.tokenStorageService.getUser().username).subscribe(next => {
        this.listGoodsCart = next;
        if (this.listGoodsCart == null) {
          this.listGoodsCart = [];
        }
      }, () => {
      }, () => {
        let coutn = this.listGoodsCart.length;
        for (const a of this.listGoodsCart) {
          coutn--;
          this.shoppingCartService.resetCart(a.idGoodsCart).subscribe(data => {
          });
        }
        if (coutn == 0) {
          this.reloadPage();
        }
      });
    }else {
    //  Vãng lai
      this.shoppingCartService.resetCartAnonymous().subscribe(data => {
        this.ngOnInit();
      });
    }
  }

  reloadPage(): void {
    window.location.reload();
  }

  searchByGoodsType(value: string): void {
    if (value !== 'all') {
      console.log(value);
      this.shoppingCartService.searchByGoodsType(value).subscribe(next => {
        this.listGoods = next;
      });
    } else {
      this.shoppingCartService.getAll().subscribe(data => {
        this.listGoods = data;
        console.log(this.listGoods);
      });
    }
  }
}
