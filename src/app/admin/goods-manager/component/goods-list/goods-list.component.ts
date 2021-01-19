import {Component, Inject, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../../page-common/service/token-storage/token-storage.service';
import {AuthenticationService} from '../../../../page-common/service/auth/authentication.service';
import {Goods} from '../../../../shopping-cart/model/goods.class';
import {GoodsManageService} from '../../service/goods-manage.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {Router} from '@angular/router';
import {Category} from '../../model/type.class';

@Component({
  selector: 'app-goods-list',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.css']
})
export class GoodsListComponent implements OnInit {
  public listGoods: Goods[] = [];
  public goods: Goods;
  public goodsName;
  public idGoods;
  public formCreate: FormGroup;
  public image;
  url = this.image;
  selectedImage: any = null;
  p: any;
  public categoryList: Category[] = [];

  constructor(private tokenStorageService: TokenStorageService,
              private authenticationService: AuthenticationService,
              private toast: ToastrService,
              private router: Router,
              private fb: FormBuilder,
              private goodsManageService: GoodsManageService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.formCreate = this.fb.group({
      idGoods: ['', [Validators.required]],
      goodsName: ['', [Validators.required]],
      price: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      tradeMark: ['', [Validators.required]],
      saleOff: ['', [Validators.required]],
      image: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
    this.goodsManageService.getAll().subscribe(data => {
      this.listGoods = data;
      console.log(this.listGoods);
    });
    this.goodsManageService.getAllTypeGoods().subscribe(data => {
      this.categoryList = data;
    });
  }

  routerManager(managerGoods: string): void {
    this.router.navigateByUrl(managerGoods);
  }

  reloadPage(): void {
    window.location.reload();
  }

  getName(goodsName: string, idGoods ): void {
    this.goodsName = goodsName;
    this.idGoods = idGoods;
  }

  deleteGoods(): void {
    this.goodsManageService.deleteById(this.idGoods).subscribe(data => {
      console.log('ok');
    }, () => {
    }, () => {
      this.ngOnInit();
      this.toast.success('Xóa thành công.', 'Thông báo');
    });
  }

  displayModal(idGoods: number, idCategory): void {
    this.goodsManageService.findById(idGoods).subscribe(data => {
      this.url = data.image;
      this.image = data.image;
      this.idGoods = idGoods;
      this.goods = data;
      this.formCreate.patchValue(this.goods);
      this.formCreate.controls.category.setValue(idCategory);
    });
  }

  setGoods(): void {
    this.formCreate.markAllAsTouched();
    if (this.formCreate.valid) {
      const name = this.tokenStorageService.getUser().username;
      const fileRef = this.storage.ref(name);
      this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.url = url;
            this.authenticationService.insertImageDetails(this.url);
            this.formCreate.value.image = this.url;
            this.authenticationService.updateGoods(this.idGoods, this.formCreate.value).subscribe(data => {
              if (data == null) {
                this.toast.success('Cập nhật sản phẩm thành công !', 'Thông báo');
              }
            });
          });
        })
      ).subscribe();
    }
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

  createGoods(): void {
    // this.formCreate.markAllAsTouched();
    // if (this.formCreate.valid) {
    const name = this.tokenStorageService.getUser().username;
    const fileRef = this.storage.ref(name);
    this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.url = url;
          this.authenticationService.insertImageDetails(this.url);
          this.formCreate.value.image = this.url;
          this.authenticationService.createGoods(this.formCreate.value).subscribe(data => {
            if (data == null) {
              this.toast.success('Cập nhật sản phẩm thành công !', 'Thông báo');
            }
          });
        });
      })
    ).subscribe();
    // }
  }

  selectOption(): void {
    console.log(this.categoryList);
    this.formCreate.controls.category.setValue(null);
  }
}
