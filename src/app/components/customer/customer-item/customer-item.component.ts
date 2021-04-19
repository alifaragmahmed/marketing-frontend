import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Cache } from 'src/app/shared/cache';
import { HashTable } from 'angular-hashtable';
import { Crud } from '../../../shared/helpers/crud';
import { GlobalService } from '../../../shared/services/global.service';

@Component({
  selector: 'app-customer-item',
  templateUrl: './customer-item.component.html',
  styleUrls: ['./customer-item.component.scss']
})
export class CustomerItemComponent extends Crud implements OnInit, AfterViewInit {

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
  $: any = $;
  @Input('selected') selected = false;
  @Input() reload: any;
  @Input('selectedResources') selectedResources: HashTable<any, any>;

  @Input() categories: any = [];
  @Input() status: any = [];

  @ViewChild('moreDetail') moreDetail: ElementRef;

  constructor(public service: GlobalService) {
    super(service);
    this.baseApiUrl = "customers";

  }


  ngOnInit(): void {

  }

  ngAfterViewInit() {
    var qrcode = new this.doc.QRCode("qrcode"+this.customer.id, {
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
    this.$(this.moreDetail.nativeElement).slideToggle(300);
  }

  select() {
    this.customer.selected = true;
    this.selectedResources.put(this.customer.id, this.customer);
  }

  mouseHover(e) {
    let isSelectMode = Cache.get("selectMode");

    if (isSelectMode == 1) {
      this.select();
    }
    /*else if (isSelectMode == 0)  {
      //this.customer.selected = false;
    }*/
  }

  sendWhatsapp()  {
    let message =
   " 🌹✨الّلهُمَّ صَلِّ عَلی" +
"🍁.•°``°•.🕌¸.•°``°•.🍁" +
"🍁( 🌷  ‌‌ مُحَمَّدٍ 🌷  )🍁" +
" 🍁`•.¸🍂🍂🍂 ¸.•`🍁 " +
"    🍁    °•.¸  ¸.  وال محمد🌾🌹🌹اللهمَّﷺ🌾🌹صَلِّﷺ🌺وَسَـــلِّمْﷺ🌷وَبَارِكﷺْ🌻علىﷺنَبِيِّنَـــا💐🌹ﷺمُحمَّدﷺ-🌹🌺🕌🍁🌷🍁🌷‏​​​       ‏​​ ‏​​‏​     .• °``°•.¸.•°``°•.🌷" +
"      (  🍁  محمد 🍁)   "       +
"       `•.    .ﷺ.";
    let url = "https://api.whatsapp.com/send/?phone=2"+this.customer.whatsapp+"&text="+message+"&app_absent=0";

    let myWindow = window.open(url, "", "width=200,height=100");
    //
    //myWindow.document.body.append("<script>window.onload = function(){ window.close(); };</script>");
    myWindow.onload = function(){
      var self: any = this;
      setTimeout(() => {
        self.close();
        alert();
      }, 1000);
    };
  }

  call() {
    window.location.href = "tel:" + this.customer.phone;
  }

  edit() {
    this.$('#customerModal'+this.customer.id).modal('show');
  }
}
