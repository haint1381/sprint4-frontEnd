import {Component, OnInit} from '@angular/core';
import {Bill} from '../../../../page-common/model/bill.class';
import {GoodsCart} from '../../../../shopping-cart/model/goods-cart';
import {User} from '../../../../page-common/model/User';
import {GoodsManageService} from '../../service/goods-manage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-export-history',
  templateUrl: './export-history.component.html',
  styleUrls: ['./export-history.component.css']
})
export class ExportHistoryComponent implements OnInit {
  listBill: Bill[] = [];
  public goodsBill: GoodsCart[] = [];
  public totalMoney = 0;
  public user: User;

  constructor(private goodsManageService: GoodsManageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.goodsManageService.getAllBill().subscribe(data => {
      this.listBill = data;
      console.log(data);
      if (this.listBill == null) {
        this.listBill = [];
      }
    });
  }

  getBillDetail(idBill: number): void {
    this.goodsManageService.getBillDetail(idBill).subscribe(data => {
      this.goodsBill = data;
    });
    this.totalMoney = 0;
    for (const element of this.goodsBill) {
      this.totalMoney += (element.price * element.quantityCart - element.price * element.saleOff * element.quantityCart / 100);
    }
    console.log(this.goodsBill);
  }

  formatCash(str): void {
    return str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + '.')) + prev;
    });
  }

  routerManager(managerGoods: string): void {
    this.router.navigateByUrl(managerGoods);
  }
}
