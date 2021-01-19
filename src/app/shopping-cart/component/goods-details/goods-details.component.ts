import { Component, OnInit } from '@angular/core';
import {Goods} from '../../model/goods.class';
import {ShoppingCartService} from '../../service/shopping-cart.service';
import {ActivatedRoute} from '@angular/router';
import {GoodsManageService} from '../../../admin/goods-manager/service/goods-manage.service';
import {GoodsCart} from '../../model/goods-cart';
import {TokenStorageService} from '../../../page-common/service/token-storage/token-storage.service';

@Component({
  selector: 'app-goods-details',
  templateUrl: './goods-details.component.html',
  styleUrls: ['./goods-details.component.css']
})
export class GoodsDetailsComponent implements OnInit {
  public listGoodsCart: GoodsCart[] = [];
  public idGoodsCard: number;
  public goodsCard: Goods;
  public quantityCart = 1;
  public goodsCart: GoodsCart;
  public checkLover: boolean;
  public countLover: any;
  constructor(private  goodsService: ShoppingCartService,
              private activatedRoute: ActivatedRoute,
              private tokenStorageService: TokenStorageService,
              private goodsManageService: GoodsManageService) { }

  ngOnInit(): void {
    this.checkLover = false;
    this.activatedRoute.params.subscribe(data => {
      if (this.tokenStorageService.getUser() != null) {
        console.log('oke r');
        this.goodsService.getAllGoodsCart(this.tokenStorageService.getUser().username).subscribe(next => {
          this.listGoodsCart = next;
          if (this.listGoodsCart == null) {
            this.listGoodsCart = [];
          }
        });
      } else {
        //  vãng lai
        this.goodsService.getCartSession().subscribe(next => {
          this.listGoodsCart = next;
          if (this.listGoodsCart == null) {
            this.listGoodsCart = [];
          }
        });
      }
      this.idGoodsCard = data.id;
      console.log(this.idGoodsCard);
      this.goodsManageService.findById(this.idGoodsCard).subscribe(next => {
        this.goodsCard = next;
        this.countLover = this.goodsCard.favourite;
        console.log(this.goodsCard);
      });
    });
  }
  formatCash(str): void {
    return str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + '.')) + prev;
    });
  }
  shakingEffect(): void {
    const element = document.querySelector('.animatebutton');
    element.classList.add('animated', 'shake');
    setTimeout(() => {
      element.classList.remove('shake');
    }, 1500);
  }
  checkDuplicate(arr: any, element): boolean {
    for (const a of arr) {
      if (a.idGoods == element.idGoods) {
        return false;
      }
    }
    return true;
  }
  addToCart(element: Goods, value: string): void {
    this.shakingEffect();
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
        this.goodsCart.quantityCart = Number(value);
        this.goodsCart.idGoodsCart = null;
        this.goodsCart.status = true;
        this.goodsCart.totalQuantity = Number(element.quantity);
        this.listGoodsCart.push(this.goodsCart);
        this.goodsService.findByCart(this.tokenStorageService.getUser().username).subscribe(data => {
          this.goodsCart.cart = data;
        }, () => {
        }, () => {
          console.log(this.goodsCart);
          this.goodsService.addToCart(this.goodsCart).subscribe(data => {
            console.log('oke');
          });
        });

      } else {
        console.log('trái');
        this.goodsCart = new GoodsCart();
        this.shakingEffect();
        this.goodsService.findBy(element.idGoods).subscribe(data => {
          this.goodsCart = data;
        }, () => {
        }, () => {
          this.goodsCart.quantityCart += Number(value);
          console.log(this.goodsCart);
          this.goodsService.updateCart(this.goodsCart, String(this.goodsCart.idGoodsCart)).subscribe(data => {
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
      this.goodsService.addCartSession(this.goodsCart).subscribe(data => {
        console.log('oke');
      });
    }
  }

  getQuantity(value: string): void {
    this.quantityCart = Number(value);
  }

  setLover(id): void {
    this.checkLover = !this.checkLover;
    this.countLover ++;
    this.goodsService.setFavourite(id).subscribe(data => {
      console.log('oke');
    });
  }
}
