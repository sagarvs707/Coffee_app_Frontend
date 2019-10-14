import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Router } from '@angular/router';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-access-ordered-products',
  templateUrl: './access-ordered-products.component.html',
  styleUrls: ['./access-ordered-products.component.css']
})
export class AccessOrderedProductsComponent implements OnInit {

  constructor(private cService: CommonService, private router: Router, private toastrService: ToastrService) { }
  selected: any = {};
  sub_selected: any = {};
  measurestock_selected: any = {};
  selectPrice_Weight: any = {};
  main_image_change: any = { "main_img": "" };
  sub_image_change: any = { "product_image": "" };
  m_name: string = "";
  errorMsg: any;
  data: any;
  subdata: any = [];
  deliveryDisplay: boolean = true;
  image: any;
  imageName: any;
  del: any;
  del_sub: any;
  del_ms: any;
  del_p_w: any;
  get: any;
  sub_pro: any;
  subimage: any;
  subid: any;
  delete: any;
  controls: any = { modalImg: false }
  measure_price: any;
  ms: any;
  price_weight: any;

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.cService.fetch_main_sub_products()
      .subscribe((res: any) => {
        this.data = res.data;
        // if (this.subdata.length) {
        //   for (var i = 0; i < this.data.length; i++) {
        //     if (this.data[i].id == this.subdata[0].product_id) {
        //       console.log(this.data[i].subPro)
        //       this.products(this.data[i].subPro);
        //     }
        //   }
        // }
      })
  }

  get_single_main_pro(id) {
    this.controls.modalImg = true;
    this.cService.get_main_pro(id).subscribe((getres: any) => {
      this.get = getres.data;
    })
  }

  on_delete(id) {
    swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true
    })
      .then((willDelete) => {
        if (willDelete.value) {
          this.cService.delete_main_pro(id).subscribe((del_data: any) => {
            this.del = del_data;
            swal.fire("Deleted successfully");
            this.getProduct();
          })
        }
      })
  }

  products(sub) {
    this.deliveryDisplay = false;
    this.subdata = sub;
  }

  get_sub_pro(d) {
    this.controls.modalImg = true;
    this.cService.get_sub_pro(d.id).subscribe((sub: any) => {
      this.sub_pro = sub.data;
      this.subimage = this.sub_pro.product_image
      this.subid = this.sub_pro.id
    })
  }

  onSubmit(id) {
    for (var isNotEmpty in this.selected)
      this.cService.update_main_pro(this.selected, id).subscribe((data: any) => {
        if (data.statuscode == '200' && data.status == 'success') {
          this.toastrService.success(data.message, 'Success');
          this.selected = {};
          this.getProduct();
        }
        else if (data.statuscode == '404' && data.status == 'error') {
          this.errorMsg = data.message;
          this.toastrService.warning(this.errorMsg);
        }
      })
    this.toastrService.info("Please fill the required fields", "Warning");
  }

  uploadImage(w, e, z) {
    this.imageName = w;
    this.main_image_change = e[0];
    var reader = new FileReader();
    reader.readAsDataURL(z.target.files[0]);
    reader.onload = (event) => {
      this.image = (<FileReader>event.target).result;
    }

  }

  on_Change(id) {
    let fd = new FormData();
    fd.set('main_category', this.main_image_change);
    this.cService.update_main_pro(fd, id).subscribe((data: any) => {
      if (data.statuscode == '200' && data.status == 'success') {
        swal.fire({
          type: 'success',
          title: 'Change image',
          text: data.message,

        })
        this.main_image_change = {};
        this.getProduct();
      }
      else if (data.statuscode == '404' && data.status == 'error') {
        swal.fire({
          type: 'warning',
          title: 'Product details',
          text: data.message,
        })
      }
    })
  }



  onSubproductedit(id) {
    if (Object.keys(this.sub_selected).length == 0) {
      this.toastrService.warning("Please fill required fields", "Error");
    }
    else {
      this.cService.edit_sub_pro(this.sub_selected, id).subscribe((data: any) => {
        if (data.statuscode == '200' && data.status == 'success') {
          this.toastrService.success(data.message, 'Success');
          this.sub_selected = {};
          this.getProduct();
          for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].id == this.subdata[0].product_id) {
              this.products(this.data[i].subPro);
            }
          }
        }
        else if (data.statuscode == '404' && data.status == 'error') {
          this.errorMsg = data.message;
          this.toastrService.warning(this.errorMsg);
        }
      })
    }
  }

  delete_subproduct(id) {
    swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true
    })
      .then((willDelete) => {
        if (willDelete.value) {
          this.cService.delete_sub_pro(id).subscribe((del_sub_data: any) => {
            if (del_sub_data.statuscode == '204' && del_sub_data.status == 'success') {
              this.del_sub = del_sub_data;
              swal.fire("Deleted successfully");
              this.getProduct();
            }
            else {
              this.toastrService.warning(del_sub_data.message);
            }
          })
        }
      })
  }

  postSubImage(name, image, target) {
    this.imageName = name;
    this.sub_image_change = image[0];
    var reader = new FileReader();
    reader.readAsDataURL(target.target.files[0]);
    reader.onload = (event) => {
      this.image = (<FileReader>event.target).result;
    }
  }

  change_sub_image(id) {
    let fd = new FormData();
    fd.set('product_image', this.sub_image_change);
    this.cService.edit_sub_pro(fd, id).subscribe((data: any) => {
      if (data.statuscode == '200' && data.status == 'success') {
        swal.fire({
          type: 'success',
          title: 'Change image',
          text: data.message,
        })
        this.sub_image_change = {};
        this.getProduct();

      }
      else if (data.statuscode == '404' && data.status == 'error') {
        swal.fire({
          type: 'warning',
          title: 'Product details',
          text: data.message,
        })
      }
    })
  }

  getMeasurePrice(id) {
    this.cService.fetch_measurestock(id).subscribe((data: any) => {
      this.measure_price = data.data
      if (this.measure_price == "") {
        this.toastrService.info("There is no measurs, stocks and prices", "Warning");
      }
    })
  }

  update_measure_stock(d) {
    if (Object.keys(this.measurestock_selected).length == 0) {
      this.toastrService.warning("Please fill required fields", "Error");
    }
    else {
      this.cService.update_m_and_s(this.measurestock_selected, d.id).subscribe((measure_stocks: any) => {
        if (measure_stocks.statuscode == '200' && measure_stocks.status == 'success') {
          this.toastrService.success(measure_stocks.message, 'Success');
          this.measurestock_selected = {};
          this.getMeasurePrice(d.sub_product_id)
        }
        else if (measure_stocks.statuscode == '404' && measure_stocks.status == 'error') {
          this.errorMsg = measure_stocks.message;
          this.toastrService.warning(this.errorMsg);
        }
      })
    }
  }

  delete_measure_stocks(d) {
    swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true
    })
      .then((willDelete) => {
        if (willDelete.value) {
          this.cService.delete_measure_stocks(d.id).subscribe((deleted_m_s: any) => {
            if (deleted_m_s.statuscode == '204' && deleted_m_s.status == 'success') {
              this.del_ms = deleted_m_s;
              swal.fire("Deleted successfully");
            }
            else {
              this.toastrService.warning(deleted_m_s.message);
            }
            this.getMeasurePrice(d.sub_product_id)
          })
        }
      })
  }

  priceweight(pw) {
    this.price_weight = pw
  }

  updatePriceWeight(pw) {
    if (Object.keys(this.selectPrice_Weight).length == 0) {
      this.toastrService.warning("Please fill required fields", "Error");
    }
    else {
      this.cService.update_m_and_s(this.selectPrice_Weight, pw.id).subscribe((pricestock: any) => {
        if (pricestock.statuscode == '200' && pricestock.status == 'success') {
          this.toastrService.success(pricestock.message, 'Success');
          this.selectPrice_Weight = {};
          for (var i = 0; i < this.measure_price.length; i++) {
            this.getMeasurePrice(this.measure_price[i].sub_product_id)
          }
        }
        else if (pricestock.statuscode == '404' && pricestock.status == 'error') {
          this.errorMsg = pricestock.message;
          this.toastrService.warning(this.errorMsg);
        }
      })
    }
  }

  delete_price_weight(id) {
    swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true
    })
      .then((willDelete) => {
        if (willDelete.value) {
          this.cService.deletePriceWeight(id).subscribe((del_price_weight: any) => {
            if (del_price_weight.statuscode == '204' && del_price_weight.status == 'success') {
              this.del_p_w = del_price_weight;
              swal.fire("Deleted successfully");
            }
            else {
              this.toastrService.warning(del_price_weight.message);
            }
            for (var i = 0; i < this.measure_price.length; i++) {
              this.getMeasurePrice(this.measure_price[i].sub_product_id)
            }
          })
        }
      })
  }

}


