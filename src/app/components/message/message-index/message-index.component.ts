import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Crud } from '../../../shared/helpers/crud';
import { GlobalService } from '../../../shared/services/global.service';
import { HashTable } from 'angular-hashtable';
import { Cache } from 'src/app/shared/cache';
import { Message } from '../../../shared/message';

@Component({
  selector: 'app-message-index',
  templateUrl: './message-index.component.html',
  styleUrls: ['./message-index.component.scss']
})
export class MessageIndexComponent extends Crud implements OnInit, AfterViewInit {

  data: any = { data: [] };
  doc: any = document;
  $: any = $;
  categories: any = [];
  status: any = [];

  selectedCategory: HashTable<any, any> = new HashTable<any, any>();
  selectedStatus: HashTable<any, any> = new HashTable<any, any>();

  selectMode: any = false;
  isSelectAll: any = false;

  @ViewChild('customerContainer') customerContainer: ElementRef;
  @ViewChild('filterMenu') filterMenu: ElementRef;

  isExpanded: any = false;

  constructor(public service: GlobalService) {
    super(service);
    this.baseApiUrl = "messages";
    this.paging = true;
  }

  ngOnInit(): void {
    this.get(true);
  }

  ngAfterViewInit() {
    let navbarHeight = 100;
    this.customerContainer.nativeElement.style.height = (window.innerHeight - navbarHeight) + "px";
    this.filterMenu.nativeElement.style.height = (window.innerHeight - navbarHeight) + "px";
  }

  toggle(className: any) {
    this.$("."+className).slideToggle(300);
  }

  setPageLength() {
    let value = prompt("ادخل عدد الرسائل فى الصفحة");

    if (value) {
      this.filter.page_length = value;
      this.get();
    }
  }

  create() {
    this.resource = { message: '' };
    this.$('#messageModal').modal('show');
  }

  edit(item) {
    this.resource = item;
    this.$('#messageModal').modal('show');
  }

  copyMessage(item) {
    let copyText: any = document.createElement('input');

    copyText.innerHTML = item.message;

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand("copy");

    console.log("message copied to clipboard ", item.message);
    Message.success('تم نسخ الرسالة');
  }
}
