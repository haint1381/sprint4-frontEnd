import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from '../../service/shopping-cart.service';
import {Goods} from '../../model/goods.class';
import {GoodsCart} from '../../model/goods-cart';

@Component({
  selector: 'app-list-cart',
  templateUrl: './bill-goods.component.html',
  styleUrls: ['./bill-goods.component.css']
})
export class BillGoodsComponent implements OnInit {
  public listGoodsCart: GoodsCart[] = [];
  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingCartService.getAllGoodsCart('tienhai').subscribe(next => {
      this.listGoodsCart = next;
    });
  }
  formatCash(str): void {
    return str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + '.')) + prev;
    });
  }
}
