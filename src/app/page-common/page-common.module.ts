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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { OrderHistoryComponent } from './component/order-history/order-history.component';
import { HistoryDetailComponent } from './component/history-detail/history-detail.component';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {ResetPasswordComponent} from './component/reset-password/reset-password.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, BodyPageComponent, ContactComponent, BlogComponent, OrderHistoryComponent, HistoryDetailComponent, ResetPasswordComponent],
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
    FormsModule,
    FormsModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [{
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('403157934286467'),
      },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('951985442399-2ph19bugutogvlu8rtii6admucm3i4nt.apps.googleusercontent.com'),
        },
      ],
    } as SocialAuthServiceConfig,
  }],
})
export class PageCommonModule { }
