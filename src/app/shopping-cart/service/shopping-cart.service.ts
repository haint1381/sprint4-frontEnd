import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Goods} from '../model/goods.class';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GoodsCart} from '../model/goods-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  public API = 'http://localhost:8080/goods/';
  public API_CART = 'http://localhost:8080/cart/';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Goods[]> {
    return this.http.get<Goods[]>(this.API + 'getAll');
  }
  getAllGoodsCart(username): Observable<GoodsCart[]> {
    let params = new HttpParams();
    params = params.append('username', username);
    return this.http.get<GoodsCart[]>(this.API_CART + 'getAll', {params});
  }
  findBy(idGoods): Observable<GoodsCart> {
    return this.http.get<GoodsCart>(this.API_CART + 'findByIdGoods/' + idGoods);
  }
  addToCart(goodsCart): Observable<any> {
    return this.http.post(this.API_CART + 'add', goodsCart);
  }
  updateCart(goodsCart: GoodsCart, idGoodsCart: string): Observable<GoodsCart> {
    let params = new HttpParams();
    params = params.append('idGoodsCart', idGoodsCart);
    return this.http.put<GoodsCart>(this.API_CART + 'update-goods-cart', goodsCart, {params});
  }
  findByCart(username): Observable<any> {
    let params = new HttpParams();
    params = params.append('username', username);
    return this.http.get<any>(this.API_CART + 'find-by-cart', {params});
  }

  searchByGoodsType(value: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('valueSearch', value);
    return this.http.get<any>(this.API + 'searchByGoodsType', {params});
  }

  resetCart(idGoodsCart): Observable<any>{
    let params = new HttpParams();
    params = params.append('idGoodsCart', idGoodsCart);
    return this.http.delete<any>(this.API_CART + 'deleteAll', {params});
  }
}
