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

  image: any;
  imageName: any;
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

  uploadImage(w, e) {
    this.imageName = w;
    this.image = e[0];
  }

  allMainProName() {
    this.cService.main_pro_names().subscribe((data: any) => {
      this.names = data.data;
    })
  }

  selectMainProd(e) {
    this.productId = e.target.value
    console.log(this.productId)
  }

  onSubmit() {
    let fd = new FormData();
    fd.set('product', this.productId);
    fd.set('name', this.uploadgin.name);
    fd.set('tax', this.uploadgin.tax);
    fd.set('discount', this.uploadgin.discount);
    fd.set('description', this.uploadgin.description);
    fd.set('product_image', this.image);
    if (this.productId != 0) {
      if (this.uploadgin.name == null || this.uploadgin.name != "") {
        if (this.uploadgin.tax == null || this.uploadgin.tax != "") {
          if (this.image == null || this.image != "") {

            this.cService.sendsubProduct(fd).subscribe((data: any) => {
              if (data.statuscode == '200' && data.status == 'success') {
                this.uploadgin.errorMsg = data.message;
                this.toastrService.success(data.message, 'Success');
                this.uploadgin = { product: '', name: '', tax: '', discount: '', description: '', errorMsg: '' }
              }
              else if (data.statuscode == '404' && data.status == 'error') {
                console.log(data.message)
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
          this.toastrService.error("Please enter Tax", "Error");
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