import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {BillGoodsComponent} from './component/bill-goods/bill-goods.component';
import {CheckOutComponent} from './component/check-out/check-out.component';
import {GoodsDetailsComponent} from './component/goods-details/goods-details.component';
import {ListGoodsComponent} from './component/list-goods/list-goods.component';
import {MatDialogModule} from '@angular/material/dialog';
import {NgxPaginationModule} from 'ngx-pagination';
import {ShopRoute} from './shopping-cart.router';



@NgModule({
  declarations: [BillGoodsComponent, CheckOutComponent, GoodsDetailsComponent, ListGoodsComponent],
  exports: [
    ListGoodsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ShopRoute),
    MatDialogModule,
    NgxPaginationModule
  ]
})
export class ShoppingCartModule { }
