import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from '../../../shared/services/global.service';
import { Message } from '../../../shared/message';
import { HashTable } from 'angular-hashtable';

@Component({
  selector: 'app-select-message',
  templateUrl: './select-message.component.html',
  styleUrls: ['./select-message.component.scss']
})
export class SelectMessageComponent implements OnInit {

  isSubmit: any = false;
  message: any = {};
  @Input() messages: any = [];

  @Input() customers: HashTable<any, any>;

  constructor(private service: GlobalService) {

  }

  ngOnInit() {
    //this.loadMessages();
  }

  select(item) {
    this.message = item;
  }

  loadMessages() {
    this.service.get("messages").subscribe((res: any) => {
      this.messages = res.data;
    });
  }

  sendMessage() {
    let data = {
      customers: this.customers.getKeys(),
      message: this.message.message
    };
    this.isSubmit = true;
    this.service.store("customers/send-message", data).subscribe((res: any) => {
      if (res.status == 1) {
        Message.success(res.message);
      } else {
        Message.error(res.message);
      }

      this.isSubmit = false;
    });
  }

}
