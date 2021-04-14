import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-customer-item',
  templateUrl: './customer-item.component.html',
  styleUrls: ['./customer-item.component.scss']
})
export class CustomerItemComponent implements OnInit, AfterViewInit {

  @Input() customer: any = {
    name: "مستر عبد الغنى",
    category: {
      name: "مدرس"
    },
    code: 56565,
    phone: '01123904214',
    email: 'alifaragmahmed@gmail.com',
    whatsapp: '01123904214',
  };

  doc: any = document;

  @ViewChild('moreDetail') moreDetail: ElementRef;

  constructor() { }


  ngOnInit(): void {
  }

  ngAfterViewInit() {
    var qrcode = new this.doc.QRCode("qrcode", {
        text: this.customer.code,
        width: 60,
        height: 60,
        colorDark : "#009688",
        colorLight : "#ffffff",
        correctLevel : this.doc.QRCode.CorrectLevel.H
    });
  }

  toggleMoreDetail() {
    console.log(this.moreDetail);
    this.doc.$(this.moreDetail.nativeElement).slideToggle(300);
  }

}
