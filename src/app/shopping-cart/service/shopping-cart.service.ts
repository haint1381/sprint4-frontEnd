import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Goods} from '../model/goods.class';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GoodsCart} from '../model/goods-cart';
import {User} from '../../page-common/model/User';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  // public API = 'https://fresh-food-nth.herokuapp.com/goods/';
  // public API_SESSION = 'https://fresh-food-nth.herokuapp.com/session';
  // public API_CART = 'https://fresh-food-nth.herokuapp.com/cart/';
  public API = 'http://localhost:8080/goods/';
  public API_SESSION = 'http://localhost:8080/session';
  public API_CART = 'http://localhost:8080/cart/';
  public checkSendMail = true;
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

  findByUser(username): Observable<any> {
    let params = new HttpParams();
    params = params.append('username', username);
    return this.http.get(this.API + 'find-by', {params});
  }
  payMoney(username): Observable<any> {
    let params = new HttpParams();
    params = params.append('username', username);
    return this.http.get(this.API_CART + 'pay-money', {params});
  }
//  vãng lai
  addCartSession(goodsCart: GoodsCart): Observable<any>{
    return this.http.post(this.API_SESSION + '/add', goodsCart);
  }
  getCartSession(): Observable<GoodsCart[]>{
    return this.http.get<GoodsCart[]>(this.API_SESSION);
  }

  payMoneyAnonymous(user: User): Observable<any> {
    return this.http.post(this.API_SESSION + '/pay-money', user);
  }

  getByInputSearch(inputSearch: string): Observable<any> {
    return this.http.get<GoodsCart[]>(this.API + 'inputSearch/' + inputSearch);
  }

  resetCartAnonymous(): Observable<any> {
    return this.http.get<any>(this.API_SESSION + '/reset-cart');
  }

  setFavourite(id): Observable<any> {
    return this.http.get<any>(this.API + 'setFavourite/' + id);
  }
}
