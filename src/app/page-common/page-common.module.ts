import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {CommonRoute} from './page-common.router';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { BodyPageComponent } from './component/body-page/body-page.component';
import { ContactComponent } from './component/contact/contact.component';
import { BlogComponent } from './component/blog/blog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, BodyPageComponent, ContactComponent, BlogComponent],
  exports: [
    HeaderComponent,
    FooterComponent,
    BodyPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CommonRoute),
    MatDialogModule,
    ReactiveFormsModule,
  ]
})
export class PageCommonModule { }
