import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManageService {
  public API = 'http://localhost:8080/user/';
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.API + 'getAll');
  }

  userLock(idUser): Observable<any> {
    return this.http.get<any>(this.API + 'userLock/' + idUser);
  }
}
