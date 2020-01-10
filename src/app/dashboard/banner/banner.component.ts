import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor(private cService: CommonService, private router: Router, private toastrService: ToastrService) { }
  image: any;
  single_image: any;
  banner: any = { 'bannerOne': '' }
  controls: any = { modalImg: false }
  change_image: any;

  ngOnInit() {
    this.get_all_banner_images();
  }

  get_all_banner_images() {
    this.cService.get_all_banners().subscribe((images: any) => {
      this.image = images.data;
    })
  }

  upload_banner_image(e){
    this.banner.bannerOne = e.target.files[0];
  }

  create_Banners() {
    let fd = new FormData();
    fd.set('bannerOne', this.banner.bannerOne);
    if (this.banner.bannerOne == undefined || this.banner.bannerOne == '') {
      fd.delete('bannerOne')
    }
    if (this.banner.bannerOne == {} || this.banner.bannerOne == undefined) {
      this.toastrService.warning("Please check fields", 'Error');
      return false;
    }
    this.cService.create_banner(fd).subscribe((res: any) => {
      if (res.statuscode == '200' && res.status == 'success') {
        this.toastrService.success(res.message, 'Success');
        this.banner = { 'bannerOne': '' }
        this.get_all_banner_images();
      }
      else if (res.statuscode == '404' && res.status == 'error') {
        this.toastrService.warning(res.message, 'Error');
      }
    })
  }

  get_single_image(id) {
    this.cService.get_single_banner(id).subscribe((single: any) => {
      this.single_image = single.data;
    })
  }

  uploadImage(e) {
    this.banner.bannerOne = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (event) => {
      this.change_image = (<FileReader>event.target).result;
    }
  }

  edit_image(id){
    let fd = new FormData();
    fd.set('bannerOne', this.banner.bannerOne);
    this.cService.edit_single_banner(id, fd).subscribe((edit_res: any) => {
      if (edit_res.statuscode == '200' && edit_res.status == 'success') {
        this.toastrService.success(edit_res.message, 'Success');
        this.get_all_banner_images();
        this.change_image=undefined;
      }
      else if (edit_res.statuscode == '404' && edit_res.status == 'error') {
        this.toastrService.warning(edit_res.message);
      }
    })
  }

  delete_subproduct_image(id) {
    swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true
    })
      .then((willDelete) => {
        if (willDelete.value) {
          this.cService.delete_single_banner(id).subscribe((del_sub_data: any) => {
            if (del_sub_data.statuscode == '200' && del_sub_data.status == 'success') {
              swal.fire("Deleted successfully");
              this.get_all_banner_images();
            }
            else {
              this.toastrService.warning(del_sub_data.message);
            }
          })
        }
      })
  }

}
