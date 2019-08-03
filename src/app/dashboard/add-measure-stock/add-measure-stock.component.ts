import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-measure-stock',
  templateUrl: './add-measure-stock.component.html',
  styleUrls: ['./add-measure-stock.component.css']
})
export class AddMeasureStockComponent implements OnInit {

  constructor() { }
  showjobID = true;

  ngOnInit() {
  }

  myjob(d)
  {
  this.showjobID=d;
  }
}