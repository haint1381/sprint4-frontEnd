import {Routes} from '@angular/router';
import {ListGoodsComponent} from './component/list-goods/list-goods.component';
import {BillGoodsComponent} from './component/bill-goods/bill-goods.component';
import {CheckOutComponent} from './component/check-out/check-out.component';
import {GoodsDetailsComponent} from './component/goods-details/goods-details.component';

export const ShopRoute: Routes = [
  {path: 'list-goods', component: ListGoodsComponent},
  {path: 'bill-goods', component: BillGoodsComponent},
  {path: 'check-out', component: CheckOutComponent},
  {path: 'goods-detail/:id', component: GoodsDetailsComponent}
];
