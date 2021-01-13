import { Component, OnInit } from '@angular/core';
import {Goods} from '../../model/goods.class';
import {ShoppingCartService} from '../../service/shopping-cart.service';

@Component({
  selector: 'app-goods-details',
  templateUrl: './goods-details.component.html',
  styleUrls: ['./goods-details.component.css']
})
export class GoodsDetailsComponent implements OnInit {
  public listGoodsCart: Goods[] = [];
  constructor(private  goodsService: ShoppingCartService) { }

  ngOnInit(): void {
    // this.listGoodsCart = this.goodsService.listGoodsCart;
  }

}
