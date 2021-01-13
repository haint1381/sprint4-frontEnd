import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {CommonRoute} from './page-common.router';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { BodyPageComponent } from './component/body-page/body-page.component';
import { ContactComponent } from './component/contact/contact.component';
import { BlogComponent } from './component/blog/blog.component';
import { LoginComponent } from './component/login/login.component';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, BodyPageComponent, ContactComponent, BlogComponent, LoginComponent],
  exports: [
    HeaderComponent,
    FooterComponent,
    BodyPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CommonRoute),
    MatDialogModule,
  ]
})
export class PageCommonModule { }
