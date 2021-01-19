import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bill} from '../../model/bill.class';
import {GoodsCart} from '../../../shopping-cart/model/goods-cart';
import {TokenDTO} from '../../model/TokenDTO';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Data} from '../../model/data';

const API_URL = 'http://localhost:8080/';
// const  API_URL = 'https://fresh-food-nth.herokuapp.com/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public inputSearch = '';
  imageDetailList: AngularFireList<any>;
  fileList: any[];
  dataSet: Data = {
    url: ''
  };
  constructor(private http: HttpClient,
              @Inject(AngularFireDatabase) private firebase: AngularFireDatabase,) { }

  public google(tokenDTO: TokenDTO): Observable<any> {
    return this.http.post<any>(API_URL + 'login-google', tokenDTO, httpOptions);
  }

  public facebook(tokenDTO: TokenDTO): Observable<any> {
    // console.log(this.httpOptions);
    return this.http.post<any>(API_URL + 'login-facebook', tokenDTO, httpOptions);
  }
  login(credentials): Observable<any> {
    return this.http.post(API_URL + 'login', credentials, httpOptions);
  }
  findByUser(username): Observable<any> {
    let params = new HttpParams();
    params = params.append('username', username);
    return this.http.get(API_URL + 'goods/find-by', {params});
  }

  getBillUser(username): Observable<Bill[]> {
    let params = new HttpParams();
    params = params.append('username', username);
    return this.http.get<Bill[]>(API_URL + 'cart/getBillUser', {params});
  }

  getBillDetail(idBill: number): Observable<GoodsCart[]> {
    let params = new HttpParams();
    params = params.append('idBill', String(idBill));
    return this.http.get<GoodsCart[]>(API_URL + 'cart/getBillDetail', {params});
  }

  getImageDetailList(): void {
    this.imageDetailList = this.firebase.list('imageDetails');
  }

  insertImageDetails( url): void {
    this.dataSet = {
      url
    };
    this.imageDetailList.push(this.dataSet);
  }

  updateAccount(idUser, user): Observable<any> {
    return this.http.patch(API_URL + 'user/edit/' + idUser, user);
  }
  updateGoods(idGoods, goods): Observable<any> {
    return this.http.patch(API_URL + 'goods/edit/' + idGoods, goods);
  }
  public createGoods(value): Observable<any> {
    // console.log(this.httpOptions);
    return this.http.post<any>(API_URL + 'goods/create', value);
  }

  public send(value: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('to', value);
    return this.http.get<any>(API_URL + 'send', {params});
  }

  public confirm(value: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('code', value);
    return this.http.get<any>(API_URL + 'confirm', {params});
  }

  public resetPassWord(value: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('password', value);
    return this.http.get<any>(API_URL + 'resetPassWord', {params});
  }
}
