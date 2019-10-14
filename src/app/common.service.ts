import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import * as jwt from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }
  userid: any;

  configurations = {
    baseURL: 'http://68.183.84.37:8000/',
    URL: 'http://127.0.0.1:8000/',
    httpOptions: {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    },
    apiList: {
      login: 'user/login/',
      dataLoad: 'product/get_user_orders/',
      getUserProductDetails: 'product/fetchUserOrderdData/',
      continuing_getUserProDe: 'product/get_product_details/',
      orderStatus: 'product/oreder_status_update/',
      stocks: 'product/count_all_stocks/',
      pendingOrders: 'product/pending_orders/',
      users: 'product/total_users/',
      mainProduct: 'product/post_product/',       // post main products
      subProduct: 'product/post_sub_product/',  // post sub products
      add_measure: 'product/add_measure/',      //post measure and stocks
      add_price_weight: 'product/price_view/',    // post price and weight 
      send_main_product_list: 'product/send_main_product_list/', //get main products names listt
      get_sub_product_list: 'product/get_subproduct_names/',  //get sub products names list
      measure_and_stock: 'product/get_measur_and_stock_list/',     //get measure and stocks names list by providing subpro id
      access_product_list: 'product/showProducts/', //get admin product show
      edit_main_product: 'product/main_product_access/', // get single main product by id and edit delet
      editsubproduct: 'product/sub_product_access/',  //edit delete and get sub products
      getMeasuresPrices: 'product/measure_price_get/', //get Measure and price list by sub product id
      update_measure_stock: 'product/update_measurestock/',   //edit and delete measure and stock
      edit_price_weight: 'product/edit_price_weight/',    //edit and delete price and weight
      delete_price_weight: 'product/delete_price_weight/'
    }
  }
  private _current_user = new BehaviorSubject<any>(0);
  current_user = this._current_user.asObservable();

  login(data) {
    return this.http.post(this.configurations.baseURL + this.configurations.apiList.login, data)
  }

  loadData() {
    return this.http.get(this.configurations.baseURL + this.configurations.apiList.getUserProductDetails, this.configurations.httpOptions)
  }

  continueOfloadData(id) {
    return this.http.get(this.configurations.baseURL + this.configurations.apiList.continuing_getUserProDe + id + '/', this.configurations.httpOptions)
  }

  updatedStatus(updated_status) {
    return this.http.post(this.configurations.baseURL + this.configurations.apiList.orderStatus, updated_status, this.configurations.httpOptions)
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
    return this.http.post(this.configurations.baseURL + this.configurations.apiList.mainProduct, product)

  }
  main_pro_names() {
    return this.http.get(this.configurations.baseURL + this.configurations.apiList.send_main_product_list, this.configurations.httpOptions)

  }
  sub_pro_names() {
    return this.http.get(this.configurations.baseURL + this.configurations.apiList.get_sub_product_list, this.configurations.httpOptions)
  }

  postMeasureStock(product) {
    return this.http.post(this.configurations.baseURL + this.configurations.apiList.add_measure, product)
  }

  fetch_measurestock(id) {
    return this.http.get(this.configurations.baseURL + this.configurations.apiList.getMeasuresPrices + id + '/', this.configurations.httpOptions)
  }

  measure_stock(id) {
    return this.http.get(this.configurations.baseURL + this.configurations.apiList.measure_and_stock + id + '/', this.configurations.httpOptions)
  }

  update_m_and_s(measurestock_selected, id){
    return this.http.put(this.configurations.baseURL + this.configurations.apiList.update_measure_stock + id + '/', measurestock_selected)
  }

  delete_measure_stocks(id){
    return this.http.delete(this.configurations.baseURL + this.configurations.apiList.update_measure_stock + id + '/', this.configurations.httpOptions)
  }

  fetch_main_sub_products() {
    return this.http.get(this.configurations.baseURL + this.configurations.apiList.access_product_list, this.configurations.httpOptions)
  }

  get_main_pro(id){
    return this.http.get(this.configurations.baseURL + this.configurations.apiList.edit_main_product + id + '/',this.configurations.httpOptions)
  }

  update_main_pro(main_pro, id) {
    return this.http.put(this.configurations.baseURL + this.configurations.apiList.edit_main_product + id + '/', main_pro)
  }

  delete_main_pro(id){
    return this.http.delete(this.configurations.baseURL + this.configurations.apiList.edit_main_product + id + '/', this.configurations.httpOptions)
  }

  sendsubProduct(product) {
    return this.http.post(this.configurations.baseURL + this.configurations.apiList.subProduct, product)
  }

  get_sub_pro(id){
    return this.http.get(this.configurations.baseURL + this.configurations.apiList.editsubproduct + id + '/', this.configurations.httpOptions)
  }

  edit_sub_pro(data, id){
    return this.http.put(this.configurations.baseURL + this.configurations.apiList.editsubproduct + id + '/', data)
  }

  delete_sub_pro(id){
    return this.http.delete(this.configurations.baseURL + this.configurations.apiList.editsubproduct + id + '/', this.configurations.httpOptions)
  }

  postPriceandWeight(product) {
    return this.http.post(this.configurations.baseURL + this.configurations.apiList.add_price_weight, product)
  }

  edit_price_weight(data, id){
    return this.http.put(this.configurations.baseURL + this.configurations.apiList.edit_price_weight + id + '/', data)
  }

  deletePriceWeight(id){
    return this.http.delete(this.configurations.baseURL + this.configurations.apiList.delete_price_weight + id + '/', this.configurations.httpOptions)
  }

  resolveToken(token) {
    if (token == "0") token = this.getToken();
    token = token == 0 ? null : token;
    if (token == null) {
      this.changeCurrentUser(0);
      return;
    } else {
      var user = this.getDecodedAccessToken(token);
      console.log(user);
      this.userid = user.id
      console.log(this.userid)
      this.changeCurrentUser(user);
    }
  }
  changeCurrentUser(data) {
    if (data == 0) {
      localStorage.setItem("token", "0");
    } else {
      console.log(this.current_user)
      this._current_user.next(data);
    }
  }
  getToken() {
    return localStorage.getItem("token");
    // this.resolveToken(localStorage.getItem("token"));
  }
  removeToken() {
    localStorage.removeItem("token");
    this.resolveToken(0)
  }
  storeToken(token) {
    if (token == "0") {
      localStorage.setItem("token", null);
    } else {
      localStorage.setItem("token", token);
      this.resolveToken(token);
      console.log(token)
    }
  }
  getDecodedAccessToken(token) {
    try {
      return jwt(token);
    } catch (Error) {
      return null;
    }
  }
  getTokenExpirationDate(token: string): Date {
    const decoded = jwt(token);
    if (decoded.exp === undefined) return null;
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }
  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;
    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }
}

