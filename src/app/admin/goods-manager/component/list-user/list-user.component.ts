import {Component, OnInit} from '@angular/core';
import {User} from '../../../../page-common/model/User';
import {ToastrService} from 'ngx-toastr';
import {UserManageService} from '../../service/user-manage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  public listUser: User[] = [];
  public fullName;
  public idUser;

  constructor(private userManageService: UserManageService,
              private toast: ToastrService,
              private router: Router) {
  }
  routerManager(managerGoods: string): void {
    this.router.navigateByUrl(managerGoods);
  }
  ngOnInit(): void {
    this.userManageService.getAll().subscribe(data => {
      this.listUser = data;
      console.log(data);
      if (data == null) {
        this.listUser = [];
      }
    });
  }

  userLock(): void {
    this.userManageService.userLock(this.idUser).subscribe(data => {
      console.log('oke');
    }, () => {
    }, () => {
      this.toast.success('Khóa tài khoản thành công !', 'Thông báo');
      this.ngOnInit();
    });
  }

  setName(fullName: string, idUser): void {
    this.fullName = fullName;
    this.idUser = idUser;
  }
}
