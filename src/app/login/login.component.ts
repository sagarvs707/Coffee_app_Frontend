import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private cService:CommonService, private router:Router) {}

  login={ email:'', password:'', errorMsg:'' }
  updateStatus={status:''}
  alertError:boolean=true

  ngOnInit() {}

  onSubmit() {
    this.cService.login({'email':this.login.email, 'password':this.login.password})
    .subscribe((data:any) => {
      console.log(data)
      if(data.statuscode=='200' && data.status=='success'){
        this.router.navigate(['adminpage'])
      }
      else if(data.code=='401' && data.status=='Fail'){
      this.alertError=false
      console.log(data.message)
      this.login.errorMsg=data.message;
      }
    })
  }
}
