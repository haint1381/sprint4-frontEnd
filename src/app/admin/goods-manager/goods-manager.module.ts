import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoodsListComponent } from './component/goods-list/goods-list.component';
import {RouterModule} from '@angular/router';
import {goodsRoute} from './goods-manager.router';
import { ImportHistoryComponent } from './component/import-history/import-history.component';
import { ExportHistoryComponent } from './component/export-history/export-history.component';
import { StatisticComponent } from './component/statistic/statistic.component';
import {IdConvert} from './common/convert-id';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {ListUserComponent} from './component/list-user/list-user.component';



@NgModule({
  declarations: [GoodsListComponent, ImportHistoryComponent, ExportHistoryComponent, StatisticComponent, IdConvert, ListUserComponent],
  exports: [
    GoodsListComponent,
    IdConvert
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(goodsRoute),
        ReactiveFormsModule,
        NgxPaginationModule,
    ]
})
export class GoodsManagerModule { }
