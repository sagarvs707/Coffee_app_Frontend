import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminpageComponent } from './dashboard/adminpage/adminpage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SubProductComponent } from './dashboard/sub-product/sub-product.component';
import { PriceWeightComponent } from './dashboard/price-weight/price-weight.component';
import { MainProductComponent } from './dashboard/main-product/main-product.component';
import { MeasureAndStocksComponent } from './dashboard/measure-and-stocks/measure-and-stocks.component';
import { ProductTableComponent } from './dashboard/product-table/product-table.component';
import { AccessOrderedProductsComponent } from './dashboard/access-ordered-products/access-ordered-products.component';
import { BannerComponent } from './dashboard/banner/banner.component';
import { AppVersionComponent } from './dashboard/app-version/app-version.component';



const routes: Routes = [
  {
    path:'dashboard', component:DashboardComponent, children:[
      {path:'adminpage', component: AdminpageComponent},
      {path:'main_product', component: MainProductComponent},
      {path:'sub_prouduct', component: SubProductComponent},
      {path:'price_weight', component:PriceWeightComponent},
      {path:'measure_stock', component:MeasureAndStocksComponent},
      {path:'product_table', component:ProductTableComponent},
      {path:'permit_product', component:AccessOrderedProductsComponent},
      {path:'banner', component:BannerComponent},
      {path:'app_version', component:AppVersionComponent},
    ]
  },
  {path:'', component: LoginComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
