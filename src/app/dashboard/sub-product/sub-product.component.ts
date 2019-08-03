import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-product',
  templateUrl: './sub-product.component.html',
  styleUrls: ['./sub-product.component.css']
})
export class SubProductComponent implements OnInit {

  constructor(private cService:CommonService, private router:Router) { }
  showjobID = true;
  names;
  ngOnInit() {
    this.allMainProName();
  }

  myjob(d)
  {
  this.showjobID=d;
  }

  allMainProName(){
    this.cService.main_pro_names().subscribe((data:any)=>{
      this.names = data
      console.log(this.names)
    })
  }

}