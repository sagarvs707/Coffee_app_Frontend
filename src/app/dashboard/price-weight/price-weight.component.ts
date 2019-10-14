import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-price-weight',
  templateUrl: './price-weight.component.html',
  styleUrls: ['./price-weight.component.css']
})
export class PriceWeightComponent implements OnInit {

  constructor(private cService: CommonService, private router: Router, private toastrService: ToastrService) { }
  uploadgin = { price: '', weight: '', errorMsg: '' }

  showjobID = true;
  names: any;
  productId: any = 0;
  measureID: any = 0;
  failMsg: any;
  errMsgs: any;
  success: any;
  measures: any;

  ngOnInit() {
    this.allsubProductNames()
  }

  myjob(d) {
    this.showjobID = d;
  }

  allsubProductNames() {
    this.cService.sub_pro_names().subscribe((data: any) => {
      this.names = data.data
    })
  }

  selectSubProd(e) {
    this.productId = e.target.value
    this.cService.measure_stock(this.productId).subscribe((data: any) => {
      this.measures = data.data
    })
  }

  getmeasuerstocks(e) {
    this.measureID = e.target.value
  }


  onSubmit() {
    let fd = new FormData();
    fd.set('measure_id', this.measureID);
    fd.set('price', this.uploadgin.price);
    fd.set('weight', this.uploadgin.weight);

    if (this.productId != 0) {
      if (this.measureID != 0) {
        if (this.uploadgin.price == null || this.uploadgin.price != "") {
          if (this.uploadgin.weight == null || this.uploadgin.weight != "") {

            this.cService.postPriceandWeight(fd).subscribe((data: any) => {
              if (data.statuscode == '200' && data.status == 'success') {
                this.success = "Price and Weight added successfully";
                this.toastrService.success(this.success, 'Success');
                this.uploadgin = { price: '', weight: '', errorMsg: '' }
              }
              else if (data.statuscode == '404' && data.status == 'error') {
                this.uploadgin.errorMsg = data.message;
                this.toastrService.warning(this.uploadgin.errorMsg);
              }
            })
          }
          else {
            this.errMsgs = "Please enter weight"
            this.toastrService.error(this.errMsgs, 'error');
          }
        }
        else {
          this.errMsgs = "Please enter price"
          this.toastrService.error(this.errMsgs, 'error');
        }
      }
      else {
        this.errMsgs = "Please select measure name"
        this.toastrService.error(this.errMsgs);
      }
    }
    else {
      this.failMsg = "Please select sub product"
      this.toastrService.error(this.failMsg)
    }
  }


}