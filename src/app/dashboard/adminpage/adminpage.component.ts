import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {

  data: any;
  data2: any;
  sortedData: any;
  Submitted: string;
  GrandTotal: number;
  coffee: {}
  p: any = {};
  order_pro_id: any;
  persmissions: any = { ids: [], p: [] };
  ids: any = [];
  stocks: any;
  pOrder: any;
  tusers: any;
  IsmodelShow = false;
  productsDetails: any = { details: {} };
  permiting_product: any = {}
  deliveryDisplay: boolean = true;
  ProductDisplay: boolean = true;
  x: any;
  constructor(private cService: CommonService, private router: Router, private toastrService: ToastrService) { }

  updateStatus = { status: '' }
  alertError: boolean = true

  ngOnInit() {
    this.loadData();
    this.sumStocks();
    this.pendingOrder();
    this.totalUsers();
  }

  loadData() {
    this.cService.loadData().subscribe((res: any) => {
      this.data = res.data;
      for(var i=0; i<this.data.length; i++){
        this.products(this.data[i].cost)
      }
    })
  }

  products(d) {
    this.deliveryDisplay = false;
    this.productsDetails.details = d;
  }

  permit_product(id) {
    this.order_pro_id = id
    this.p = {};
    this.cService.continueOfloadData(id).subscribe((res: any) => {
      this.ProductDisplay = false;
      this.x = res.data;
      if (this.x == undefined || this.x == ""){
        this.toastrService.info("Product not added", "Info");
      }
    })
  }
  // get sortData() {
  //   return this.data.sort((a, b) => {
  //     return <any>new Date(b.ordered_date) - <any>new Date(a.ordered_date);
  //   })
  // }

  permission(id, p) {
    this.p[id] = p;
  }

  updated() {
    if (Object.keys(this.p).length == 0) {
      this.toastrService.warning("Invalid submit, Please make sure selected permission", "Error");
    }
    else {
      this.cService.updatedStatus({ 'updated_status': this.p })
        .subscribe((update: any) => {
          if (update.status == "success" && update.statuscode == "200") {
            Swal.fire({
              type: 'success',
              title: 'Product details',
              text: update.message,
            })
            this.p = {};
            this.sumStocks();
            this.pendingOrder();
            this.loadData();
            this.permit_product(this.order_pro_id)
          }
          else if (update.status == "error" && update.statuscode == "404") {
            Swal.fire({
              type: 'warning',
              title: 'Product details',
              text: update.message,
            })
          }
        })
    }
  }

  sumStocks() {
    this.cService.totalStock().subscribe((status: any) => {
      this.stocks = status;
    })
  }

  pendingOrder() {
    this.cService.pendingOrders().subscribe((orders: any) => {
      this.pOrder = orders;
    })
  }

  totalUsers() {
    this.cService.totalUsers().subscribe((users: any) => {
      this.tusers = users;
    })
  }

}