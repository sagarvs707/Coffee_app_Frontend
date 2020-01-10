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
    // baseURL: 'http://127.0.0.1:8000/',
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
      getSingle_measure: 'product/get_single_measure/',
      getSingle_price: 'product/fetch_single_price/',
      update_measure_stock: 'product/update_measurestock/',   //edit and delete measure and stock
      edit_price_weight: 'product/edit_price_weight/',    //edit and delete price and weight
      delete_price_weight: 'product/delete_price_weight/',
      get_app_versions: 'user/create_version/',
      get_single_app_versions: 'user/get_single_appVersion/',
      get_update_app_versions: 'user/update_version/',
      create_appVersion: 'user/create_version/',
      aceessSubImages: 'product/access_sub_images/', //edit or delete the subproduct Images
      create_banner: 'banner/create/',
      get_all_banner_images: 'banner/get_all_banner/',
      get_single_banner_image: 'banner/access_banner/',
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

  edit_subImages(data, id){
    return this.http.put(this.configurations.baseURL + this.configurations.apiList.aceessSubImages + id + '/', data)
  }

  get_single_measure(id){
    return this.http.get(this.configurations.baseURL + this.configurations.apiList.getSingle_measure + id + '/', this.configurations.httpOptions)
  }

  get_single_price(id){
    return this.http.get(this.configurations.baseURL + this.configurations.apiList.getSingle_price + id + '/', this.configurations.httpOptions)
  }

  create_banner(data){
    return this.http.post(this.configurations.baseURL + this.configurations.apiList.create_banner, data)
  }

  get_all_banners(){
    return this.http.get(this.configurations.baseURL + this.configurations.apiList.get_all_banner_images, this.configurations.httpOptions)
  }

  get_single_banner(id){
    return this.http.get(this.configurations.baseURL + this.configurations.apiList.get_single_banner_image+id+'/', this.configurations.httpOptions)
  }

  edit_single_banner(id, data){
    return this.http.put(this.configurations.baseURL + this.configurations.apiList.get_single_banner_image+id+'/', data)
  }

  delete_single_banner(id){
    return this.http.delete(this.configurations.baseURL + this.configurations.apiList.get_single_banner_image+id+'/', this.configurations.httpOptions)
  }

  create_app_version(data) {
    return this.http.post(this.configurations.baseURL + this.configurations.apiList.create_appVersion, data)
  }

  get_app_version(){
    return this.http.get(this.configurations.baseURL + this.configurations.apiList.get_app_versions, this.configurations.httpOptions)
  }

  get_single_app_versions(id){
    return this.http.get(this.configurations.baseURL + this.configurations.apiList.get_single_app_versions+id+'/', this.configurations.httpOptions)
  }

  update_app_version(data, id){
    return this.http.put(this.configurations.baseURL + this.configurations.apiList.get_update_app_versions + id + '/', data)
  }

  delete_app_version(id){
    return this.http.delete(this.configurations.baseURL + this.configurations.apiList.get_update_app_versions + id + '/',  this.configurations.httpOptions)
  }

  

  resolveToken(token) {
    if (token == "0") token = this.getToken();
    token = token == 0 ? null : token;
    if (token == null) {
      this.changeCurrentUser(0);
      return;
    } else {
      var user = this.getDecodedAccessToken(token);
      this.userid = user.id
      this.changeCurrentUser(user);
    }
  }
  changeCurrentUser(data) {
    if (data == 0) {
      localStorage.setItem("token", "0");
    } else {
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

