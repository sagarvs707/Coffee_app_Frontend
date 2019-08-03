import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {

  data:any;
  data2:any;
  sortedData:any;
  Submitted:string;
  GrandTotal:number;
  coffee:{}
  p:any={};
  persmissions:any={ids:[],p:[]};
  ids:any=[];
  allcount:string;
  pOrder;
  tusers;
  
  constructor(private cService:CommonService, private router:Router) { }

  updateStatus={status:''}
  alertError:boolean=true

  ngOnInit() {
   this.loadData();
   this.sumStocks();
   this.pendingOrder();
   this.totalUsers();
  }
  loadData(){
    this.cService.loadData()
    .subscribe((res:any) => {
          this.data = res.data;
          // this.sortedData = this.sortData() 
        },
        error => {
            console.log("Error", error);
        }
    ); 
    console.log(this.sortedData)
  }
  get sortData(){
    return this.data.sort((a, b)=>{
      return <any>new Date(b.ordered_date) - <any>new Date(a.ordered_date);
    })
  }

  permission(id, p){
    this.p[id]=p;
  }

  
  updated(){
    this.cService.updatedStatus({'updated_status':this.p})
    .subscribe((data:any)=>{
      console.log(data)
    })
  }

  sumStocks(){
    this.cService.totalStock()
    .subscribe((status:any)=>{
      this.allcount = status
      console.log(this.allcount)
    })
  }

  pendingOrder(){
    this.cService.pendingOrders()
    .subscribe((orders:any)=>{
      this.pOrder = orders
      console.log(this.pOrder)
    })
  }

  totalUsers(){
    this.cService.totalUsers()
    .subscribe((users:any)=>{
      this.tusers = users
      console.log(this.tusers)
    })
  }
}