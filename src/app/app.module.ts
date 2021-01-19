import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {PageCommonModule} from './page-common/page-common.module';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {ShoppingCartModule} from './shopping-cart/shopping-cart.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GoodsManagerModule} from './admin/goods-manager/goods-manager.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PageCommonModule,
    HttpClientModule,
    MatDialogModule,
    ShoppingCartModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({timeOut: 2000, preventDuplicates: true}),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    ReactiveFormsModule,
    GoodsManagerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
