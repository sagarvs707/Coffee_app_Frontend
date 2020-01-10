import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule,  HttpHeaders } from '@angular/common/http';
import { AdminpageComponent } from './dashboard/adminpage/adminpage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SubProductComponent } from './dashboard/sub-product/sub-product.component';
import { PriceWeightComponent } from './dashboard/price-weight/price-weight.component';
import { MainProductComponent } from './dashboard/main-product/main-product.component';
import { MeasureAndStocksComponent } from './dashboard/measure-and-stocks/measure-and-stocks.component';
import { ProductTableComponent } from './dashboard/product-table/product-table.component';
import { AccessOrderedProductsComponent } from './dashboard/access-ordered-products/access-ordered-products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BannerComponent } from './dashboard/banner/banner.component';
import { AppVersionComponent } from './dashboard/app-version/app-version.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AppComponent,
    LoginComponent,
    AdminpageComponent,
    SubProductComponent,
    PriceWeightComponent,
    MainProductComponent,
    MeasureAndStocksComponent,
    ProductTableComponent,
    AccessOrderedProductsComponent,
    BannerComponent,
    AppVersionComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }) // ToastrModule added

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
