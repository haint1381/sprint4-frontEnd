import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/auth/authentication.service';
import {TokenStorageService} from '../../service/token-storage/token-storage.service';
import {User} from '../../model/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public loginForm: FormGroup;
  public isLoggedIn = false;
  public errorMessage = '';
  public inputType = 'password';
  public isCheckInput = false;
  public user: User;
  public role: string;
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private tokenStorageService: TokenStorageService
  ) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn === true) {
      this.user = this.tokenStorageService.getUser();
      this.role =  this.tokenStorageService.getUser().role[0];
      this.authenticationService.findByUser(this.tokenStorageService.getUser().username).subscribe(next => {
        this.user = next;
      });
    }
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  logout(): void {
    this.tokenStorageService.signOut();
    this.reloadPage();
  }
  onSubmitLogin(): void {
    console.log(this.loginForm.value);
    this.authenticationService.login(this.loginForm.value).subscribe(
      data => {
        this.tokenStorageService.saveToken(data.token);
        this.tokenStorageService.saveUser(data);
        this.isLoggedIn = true;
        this.reloadPage();
      },
      err => {
        this.errorMessage = 'Tên tài khoản và mật khẩu không hợp lệ !';
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
        this.isLoggedIn = false;
      }, () => {
        // this.reloadPage();
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

  displayPassword(): void {
    this.isCheckInput = !this.isCheckInput;
    if (this.isCheckInput == true) {
      this.inputType = 'text';
    }else {
      this.inputType = 'password';
    }
  }
}
