import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-price-weight',
  templateUrl: './price-weight.component.html',
  styleUrls: ['./price-weight.component.css']
})
export class PriceWeightComponent implements OnInit {

  constructor() { }
  showjobID = true;

  ngOnInit() {
  }

  myjob(d)
  {
  this.showjobID=d;
  }
}