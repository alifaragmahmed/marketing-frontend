import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from '../../../shared/services/global.service';
import { Message } from '../../../shared/message';
import { HashTable } from 'angular-hashtable';
import { Cache } from 'src/app/shared/cache';

@Component({
  selector: 'app-send-whatsapp-message',
  templateUrl: './send-whatsapp-message.component.html',
  styleUrls: ['./send-whatsapp-message.component.scss']
})
export class SendWhatsappMessageComponent implements OnInit {

  isSubmit: any = false;
  message: any = {};
  @Input() messages: any = [];
  closeWindow: any = false;

  @Input() customer:any = {};

  constructor(private service: GlobalService) {
    this.setCloseWindow(this.getCloseWindow());
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

  setCloseWindow(value) {
    Cache.set("close_window", value);
  }

  getCloseWindow() {
    return Cache.get("close_window");
  }

  sendMessage() {
    let message = this.message.message.replace(/(?:\r\n|\r|\n)/g, '');
    console.log("message = ", message);

    let url = "https://api.whatsapp.com/send/?phone=2"+this.customer.whatsapp+"&text="+message+"&app_absent=0";
    let myWindow = window.open(url, "", "width=200,height=100");

    if (this.getCloseWindow() == true) {
      setTimeout(() => { myWindow.close(); }, 5000);
    }
  }

}
