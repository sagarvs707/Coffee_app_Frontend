import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }
  configurations = {
    baseURL: 'http://159.65.234.19:443/',
    URL: 'http://127.0.0.1:8000/',
    httpOptions: {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    },
    apiList: {
      login: 'register/login/',
      dataLoad: 'product/get_user_orders/',
      orderStatus: 'product/oreder_status_update/',
      stocks: 'product/count_all_stocks/',
      pendingOrders: 'product/pending_orders/',
      users: 'product/total_users/',
      mainProduct: 'product/post_product/',
      send_main_product_list: 'product/send_main_product_list/'
    }
  }
  login(data) {
    return this.http.post(this.configurations.baseURL + this.configurations.apiList.login, data, this.configurations.httpOptions)
  }

  loadData() {
    return this.http.get(this.configurations.baseURL + this.configurations.apiList.dataLoad, this.configurations.httpOptions)
  }

  updatedStatus(status) {
    console.log(status)
    return this.http.post(this.configurations.baseURL + this.configurations.apiList.orderStatus, status, this.configurations.httpOptions)
  }

  totalStock() {
    return this.http.get(this.configurations.baseURL + this.configurations.apiList.stocks, this.configurations.httpOptions)
  }

  pendingOrders() {
    return this.http.get(this.configurations.baseURL + this.configurations.apiList.pendingOrders, this.configurations.httpOptions)
  }

  totalUsers() {
    return this.http.get(this.configurations.baseURL + this.configurations.apiList.users, this.configurations.httpOptions)
  }

  sendMainProduct(product) {
    console.log(product)
    return this.http.post(this.configurations.URL + this.configurations.apiList.mainProduct, product)

  }
  main_pro_names() {
    return this.http.get(this.configurations.URL + this.configurations.apiList.send_main_product_list, this.configurations.httpOptions)
    
  }
}
