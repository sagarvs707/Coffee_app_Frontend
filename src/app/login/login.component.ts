import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private cService:CommonService, private router:Router, private toastrService: ToastrService){}
  login={ email:'', password:'', errorMsg:'' }
  updateStatus={status:''}
  alertError:boolean=true

  ngOnInit() {}

  onSubmit() {
    this.cService.login({'email':this.login.email, 'password':this.login.password})
    .subscribe((data:any) => {
      if(data.statuscode=='200' && data.status=='success'){
        this.cService.storeToken(data.token)
        this.toastrService.success("Successfully log in ");
        this.router.navigate(['dashboard/adminpage'])
      }
      else if(data.status=='fail'){
      this.alertError=false
      this.toastrService.error("Please provide valid Mail id and Password", "error");
      this.login.errorMsg=data.error;
      }
    })
  }
}
