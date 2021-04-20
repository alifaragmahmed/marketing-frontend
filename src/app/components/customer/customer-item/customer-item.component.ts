import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Cache } from 'src/app/shared/cache';
import { HashTable } from 'angular-hashtable';
import { Crud } from '../../../shared/helpers/crud';
import { GlobalService } from '../../../shared/services/global.service';
import { Helper } from '../../../shared/helper';

@Component({
  selector: 'app-customer-item',
  templateUrl: './customer-item.component.html',
  styleUrls: ['./customer-item.component.scss']
})
export class CustomerItemComponent extends Crud implements OnInit, AfterViewInit {

  @Input() customer: any = {};
  @Input('selected') selected = false;
  @Input() reload: any;
  @Input('selectedResources') selectedResources: HashTable<any, any>;
  @Input() categories: any = [];
  @Input() status: any = [];
  @Input() messages: any = [];
  @ViewChild('moreDetail') moreDetail: ElementRef;

  doc: any = document;
  $: any = $;
  color: any;

  constructor(public service: GlobalService) {
    super(service);
    this.baseApiUrl = "customers";

    if (!this.color)
      this.color = Helper.randColor();
  }


  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.initQrcode();
  }

  /**
   * init qrcode
   *
   */
  initQrcode() {
    var qrcode = new this.doc.QRCode("qrcode"+this.customer.id, {
        text: this.customer.code,
        width: 60,
        height: 60,
        colorDark : "#009688",
        colorLight : "#ffffff",
        correctLevel : this.doc.QRCode.CorrectLevel.H
    });
  }

  /**
   * view more details of customer
   *
   */
  toggleMoreDetail() {
    console.log(this.moreDetail);
    this.$(this.moreDetail.nativeElement).slideToggle(300);
  }

  /**
   * select the customer
   *
   */
  select() {
    this.customer.selected = true;
    this.selectedResources.put(this.customer.id, this.customer);
  }

  /**
   * init mouse hover listner
   *
   */
  mouseHover(e) {
    let isSelectMode = Cache.get("selectMode");

    if (isSelectMode == 1) {
      this.select();
    }
  }


  /**
   * send message to customer api
   *
   */
  sendWhatsapp()  {
    this.$('#whatsappModal').modal('show');
  }

  /**
   * call to customer api
   *
   */
  call() {
    window.location.href = "tel:" + this.customer.phone;
  }

  /**
   * show edit modal for customer
   *
   */
  edit() {
    this.$('#customerModal'+this.customer.id).modal('show');
  }
}
