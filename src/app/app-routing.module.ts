import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminpageComponent } from './dashboard/adminpage/adminpage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SubProductComponent } from './dashboard/sub-product/sub-product.component';
import { AddMeasureStockComponent } from './dashboard/add-measure-stock/add-measure-stock.component';
import { PriceWeightComponent } from './dashboard/price-weight/price-weight.component';
import { MainProductComponent } from './dashboard/main-product/main-product.component';


const routes: Routes = [
  {
    path:'', component:DashboardComponent, children:[
      {path:'adminpage', component: AdminpageComponent},
      {path:'main_product', component: MainProductComponent},
      {path:'sub_prouduct', component: SubProductComponent},
      {path:'measure_stock', component: AddMeasureStockComponent},
      {path:'price_weight', component:PriceWeightComponent}
    ]
  },
  {path:'login', component: LoginComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
