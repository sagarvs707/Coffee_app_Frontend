import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-product',
  templateUrl: './main-product.component.html',
  styleUrls: ['./main-product.component.css']
})
export class MainProductComponent implements OnInit {

  constructor(private cService:CommonService, private router:Router) { }
  uploadgin={ name:'', price:'', main_category:'', errorMsg:'' }

  image:any;
  imageName:any;
  showjobID = true;
  alertError:boolean=true

  ngOnInit() {
  }

  myjob(d)
  {
  this.showjobID=d;
  }
  // openImagePicker(){
  //   document.getElementById('upload').click()
  // }
  uploadImage(w, e){
    this.imageName = w
    this.image = e[0]
    console.log(this.imageName)
    console.log(this.image)
    // this.uploadgin.main_category = e
  }
  onSubmit(){
    let fd = new FormData();
    fd.set('name',this.uploadgin.name);
    fd.set('price',this.uploadgin.price);
    fd.set('main_category',this.image);
    this.cService.sendMainProduct(fd).subscribe((data:any) => {
      console.log(data.statuscode, data.status)
      if(data.statuscode=='200' && data.status=='success'){
        this.uploadgin.errorMsg=data.message;
        alert(data.message)
      }
      else if(data.statuscode=='404' && data.status=='error'){
      console.log(data.message)
      this.uploadgin.errorMsg=data.message;
      alert(data.message)
      }
    })
  }
}
