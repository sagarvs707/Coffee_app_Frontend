import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule,  HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';
import { AdminpageComponent } from './dashboard/adminpage/adminpage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SubProductComponent } from './dashboard/sub-product/sub-product.component';
import { PriceWeightComponent } from './dashboard/price-weight/price-weight.component';
import { AddMeasureStockComponent } from './dashboard/add-measure-stock/add-measure-stock.component';
import { MainProductComponent } from './dashboard/main-product/main-product.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AppComponent,
    LoginComponent,
    AdminpageComponent,
    SubProductComponent,
    PriceWeightComponent,
    AddMeasureStockComponent,
    MainProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
