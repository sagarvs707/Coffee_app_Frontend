import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-app-version',
  templateUrl: './app-version.component.html',
  styleUrls: ['./app-version.component.css']
})
export class AppVersionComponent implements OnInit {

  constructor(private cService: CommonService, private router: Router, private toastrService: ToastrService) { }
  app: any;
  get: any = {'app_key': '', 'app_version': '', 'description': ''};
  errorMsg: any;
  selected: any = {'app_platform': '', 'app_version': '', 'description': ''}

  ngOnInit() {
    this.get_app_version();
  }

  create_app(){
    this.cService.create_app_version(this.selected).subscribe((res: any) => {
      if (res.statuscode == '200' && res.status == 'success') {
        this.toastrService.success(res.message, 'Success');
        this.selected = {'app_platform': '', 'app_version': '', 'description': ''}
        this.get_app_version();
      }
      else if (res.statuscode == '404' && res.status == 'error') {
        this.errorMsg = res.message;
        this.toastrService.warning(this.errorMsg);
      }
    })
  }

  get_app_version() {
    this.cService.get_app_version().subscribe((data: any) => {
      this.app = data.data;
      console.log(this.app)
    })
  }

  get_single_app_version(id) {
    this.cService.get_single_app_versions(id).subscribe((data: any) => {
      this.get = data.data;
      console.log(this.get)
    })
  }

  update_app_versions(d) {
    if (Object.keys(this.get).length == 0) {
      this.toastrService.warning("Please fill required fields", "Error");
    }
    else {
      let fd = new FormData();
      fd.set('app_key', this.get.app_key);
      fd.set('app_version', this.get.app_version);
      fd.set('description', this.get.description);
      this.cService.update_app_version(fd, d.id).subscribe((data: any) => {
        if (data.statuscode == '200' && data.status == 'success') {
          this.toastrService.success(data.message, 'Success');
          this.get = {'app_platform': '', 'app_version': '', 'description': ''};
          this.get_app_version();
        }
        else if (data.statuscode == '404' && data.status == 'error') {
          this.errorMsg = data.message;
          this.toastrService.warning(this.errorMsg);
        }
      })
    }
  }

  delete(id) {
    swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true
    })
      .then((willDelete) => {
        if (willDelete.value) {
          this.cService.delete_app_version(id).subscribe((del: any) => {
            if (del.statuscode == '200' && del.status == 'success') {
              swal.fire("Deleted successfully");
              this.get_app_version();
            }
            else {
              this.toastrService.warning(del.message);
            }
          })
        }
      })
  }
}
