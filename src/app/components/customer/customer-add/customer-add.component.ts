import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { Request } from 'src/app/shared/request';
import { Crud } from '../../../shared/helpers/crud';
import { GlobalService } from '../../../shared/services/global.service';
import { Message } from '../../../shared/message';
import { Helper } from '../../../shared/helper';
import { Config } from '../../../helpers/config';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent extends Crud implements OnInit {

  @Input() customers: any = [];

  @Input() reload: any;

  @Input() categories: any = [];
  @Input() status: any = [];

  constructor(public service: GlobalService) {
    super(service);
    this.baseApiUrl = "customers";
  }


  ngOnInit() {
  }

  customLoadFile(e, k, m) {
    this.loadFile(e, k, m);
    m[k] = m[k+"_url"];
  }

  add() {
    this.customers.push({});
  }

  sendAllCustomers() {
    this.customers.forEach(customer => {
      Request.addToQueue({observer: this.service.store("customers/store", customer), action: res => {
        // do nothing
      }});
    });

    // start the request
    this.isSubmit = true;

    Request.fire(() => {
      this.finish();
    });
  }

  finish() {
    this.isSubmit = false;
    Message.success("تم اضافة العملاء");
    this.customers = [];

    if (this.reload)
      this.reload();
  }

}
