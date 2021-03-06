import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sub-product',
  templateUrl: './sub-product.component.html',
  styleUrls: ['./sub-product.component.css']
})
export class SubProductComponent implements OnInit {

  constructor(private cService: CommonService, private router: Router, private toastrService: ToastrService) { }
  uploadgin = { product: '', name: '', tax: '', discount: '', description: '', errorMsg: '' }

  imageOne: any;
  imageTwo: any;
  imageThree: any;
  showjobID = true;
  names;
  productId: any = 0;
  failMsg: any;

  ngOnInit() {
    this.allMainProName();
  }

  myjob(d) {
    this.showjobID = d;
  }

  uploadImageOne(e) {
    this.imageOne = e[0];
  }
  uploadImageTwo(e) {
    this.imageTwo = e[0];
  }
  uploadImageThree(e) {
    this.imageThree = e[0];
  }

  allMainProName() {
    this.cService.main_pro_names().subscribe((data: any) => {
      this.names = data.data;
    })
  }

  selectMainProd(e) {
    this.productId = e.target.value
  }

  onSubmit() {
    let fd = new FormData();
    fd.set('product', this.productId);
    fd.set('name', this.uploadgin.name);
    fd.set('tax', this.uploadgin.tax);
    fd.set('discount', this.uploadgin.discount);
    fd.set('description', this.uploadgin.description);
    fd.set('product_imageOne', this.imageOne);
    fd.set('product_imageTwo', this.imageTwo);
    fd.set('product_imageThree', this.imageThree);
    if (this.productId != 0) {
      if (this.uploadgin.name == null || this.uploadgin.name != "") {
        if (this.imageOne == null || this.imageOne != "") {
          this.cService.sendsubProduct(fd).subscribe((data: any) => {
            if (data.statuscode == '200' && data.status == 'success') {
              this.uploadgin.errorMsg = data.message;
              this.toastrService.success(data.message, 'Success');
              this.uploadgin = { product: '', name: '', tax: '', discount: '', description: '', errorMsg: '' }
            }
            else if (data.statuscode == '404' && data.status == 'error') {
              this.uploadgin.errorMsg = data.message;
              this.toastrService.error(data.message);
            }
          })
        }
        else {
          this.toastrService.error("Please select a Image", "Error");
        }
      }
      else {
        this.toastrService.error("Please enter Sub product name", "Error");
      }
    }
    else {
      this.toastrService.error("Please select Main product", "Error");
    }
  }

  nextPage() {
    this.router.navigate(['dashboard/measure_stock'])
  }

}