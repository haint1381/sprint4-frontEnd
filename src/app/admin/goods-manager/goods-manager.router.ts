import {Routes} from '@angular/router';
import {GoodsListComponent} from './component/goods-list/goods-list.component';
import {ImportHistoryComponent} from './component/import-history/import-history.component';
import {ExportHistoryComponent} from './component/export-history/export-history.component';
import {StatisticComponent} from './component/statistic/statistic.component';
import {ListUserComponent} from './component/list-user/list-user.component';

export const goodsRoute: Routes = [
  {path: 'manager-goods', component: GoodsListComponent},
  {path: 'manager-import', component: ImportHistoryComponent},
  {path: 'manager-export', component: ExportHistoryComponent},
  {path: 'manager-statistic', component: StatisticComponent},
  {path: 'manager-user', component: ListUserComponent}
];
