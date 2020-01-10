import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-measure-and-stocks',
  templateUrl: './measure-and-stocks.component.html',
  styleUrls: ['./measure-and-stocks.component.css']
})
export class MeasureAndStocksComponent implements OnInit {
  constructor(private cService: CommonService, private router: Router, private toastrService: ToastrService) { }
  uploadgin = { measure: '', stock: '', measure_description: '', errorMsg: '' }

  showjobID = true;
  names;
  productId: any = 0;
  failMsg;
  success: any

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
  }

  onSubmit() {
    let fd = new FormData();
    fd.set('sub_product_id', this.productId);
    fd.set('measure', this.uploadgin.measure);
    fd.set('stocks', this.uploadgin.stock);
    fd.set('measure_description', this.uploadgin.measure_description);
    if (this.productId != 0) {
      if (this.uploadgin.measure == null || this.uploadgin.measure != ""){
        if (this.uploadgin.stock == null || this.uploadgin.stock != ""){
          this.cService.postMeasureStock(fd).subscribe((data: any) => {
            if (data.statuscode == '200' && data.status == 'success') {
              this.success = "Measure and Stocks added successfully";
              this.toastrService.success(this.success);
              this.uploadgin = { measure: '', stock: '', measure_description: '', errorMsg: '' }
            }
            else if (data.statuscode == '404' && data.status == 'error') {
              this.uploadgin.errorMsg = data.message;
              this.toastrService.info(this.uploadgin.errorMsg, "Warning");
            }
          })
        }
        else{
          this.toastrService.error("Please enter the Stock", 'Error')
        }
      }
      else{
        this.toastrService.error("Please enter the Measure", 'Error')
      }
    }
    else {
      this.failMsg = "Please select sub product"
      this.toastrService.error(this.failMsg, 'Error')
    }
  }

  nextPage() {
    this.router.navigate(['dashboard/price_weight'])
  }

}
