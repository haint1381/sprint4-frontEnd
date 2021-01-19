import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/auth/authentication.service';
import {TokenStorageService} from '../../service/token-storage/token-storage.service';
import {User} from '../../model/User';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {TokenDTO} from '../../model/TokenDTO';
import {OrderConfirmComponent} from '../../../shopping-cart/component/order-confirm/order-confirm.component';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {ResetPasswordComponent} from '../reset-password/reset-password.component';

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
  public role;
  public user: User;
  socialUser: SocialUser;
  public idUser: string;
  formEdit: FormGroup;
  public image;
  url = this.image;
  selectedImage: any = null;
  constructor(
    public dialog: MatDialog,
    public router: Router,
    private fb: FormBuilder,
    private toast: ToastrService,
    private authenticationService: AuthenticationService,
    private tokenStorageService: TokenStorageService,
    private authService: SocialAuthService,
    @Inject(AngularFireStorage) private storage: AngularFireStorage
  ) {
  }

  ngOnInit(): void {
    this.authenticationService.getImageDetailList();
    this.formEdit = this.fb.group({
      idUser: ['', [Validators.required]],
      password: ['', [Validators.required]],
      username: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      image: ['', [Validators.required]]
    });
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn === true) {
      this.idUser = this.tokenStorageService.getUser().id;
      this.role = this.tokenStorageService.getUser().role[0];
      this.user = this.tokenStorageService.getUser();
      this.authenticationService.findByUser(this.tokenStorageService.getUser().username).subscribe(next => {
        this.user = next;
      }, () => {
      }, () => {
        console.log(this.user);
        this.url = this.user.image;
        this.image = this.user.image;
        this.formEdit.patchValue(this.user);
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
    } else {
      this.inputType = 'password';
    }
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialUser = data;
        // @ts-ignore
        this.idUser = data.id;
        const token = new TokenDTO(this.socialUser.idToken);
        this.authenticationService.google(token).subscribe(next => {
          this.tokenStorageService.saveToken(next.accessToken);
          this.tokenStorageService.saveUser(next);
          this.isLoggedIn = true;
          this.reloadPage();
        }, err => {
          this.isLoggedIn = false;
        });
      }
    );
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialUser = data;
        const token = new TokenDTO(this.socialUser.authToken);
        this.idUser = data.id;
        this.authenticationService.facebook(token).subscribe(next => {
          this.tokenStorageService.saveToken(next.accessToken);
          this.tokenStorageService.saveUser(next);
          this.isLoggedIn = true;
          this.reloadPage();
        }, err => {
          console.log('error');
          this.isLoggedIn = false;
        });
      }
    );
  }

  showPreview(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.url = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.url = this.image;
      this.selectedImage = null;
    }
  }
  setAccount(): void {
    this.formEdit.markAllAsTouched();
    if (this.formEdit.valid) {
      const name = this.tokenStorageService.getUser().username;
      const fileRef = this.storage.ref(name);
      this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.url = url;
            this.authenticationService.insertImageDetails(this.url);
            this.formEdit.value.image = this.url;
            this.authenticationService.updateAccount(this.tokenStorageService.getUser().id, this.formEdit.value).subscribe(data => {
              if (data == null) {
                this.toast.success('Cập nhật ảnh thành công !', 'Thông báo');
              }
            });
          });
        })
      ).subscribe();
    }
  }
  reset(): void {
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '500px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  routerManager(): void {
    this.router.navigateByUrl('manager-goods');
  }
}
