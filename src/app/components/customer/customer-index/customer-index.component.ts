import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-customer-index',
  templateUrl: './customer-index.component.html',
  styleUrls: ['./customer-index.component.scss']
})
export class CustomerIndexComponent implements OnInit, AfterViewInit {

  data: any = { data: [] };

  @ViewChild('customerContainer') CustomerContainer: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.CustomerContainer.nativeElement.style.height = (window.innerHeight - 44) + "px";
  }

}
