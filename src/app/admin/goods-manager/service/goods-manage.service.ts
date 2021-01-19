import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Goods} from '../../../shopping-cart/model/goods.class';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoodsManageService {
  public API = 'http://localhost:8080/goods/';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Goods[]> {
    return this.http.get<Goods[]>(this.API + 'getAllGoods-dto');
  }

  deleteById(id): Observable<any> {
    return this.http.delete<any>(this.API + 'deleteById/' + id);
  }

  findById(id): Observable<any> {
    return this.http.get<any>(this.API + 'findById/' + id);
  }

  getAllBill(): Observable<any> {
    return this.http.get<any>(this.API + 'getAllBill');
  }

  getBillDetail(idBill: number): Observable<any> {
    return this.http.get<any>(this.API + 'getBillDetail/' + idBill);
  }

  getAllTypeGoods(): Observable<any> {
    return this.http.get<any>(this.API + 'getAllTypeGoods');
  }

}
