import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Crud } from '../../../shared/helpers/crud';
import { GlobalService } from '../../../shared/services/global.service';
import { HashTable } from 'angular-hashtable';
import { Cache } from 'src/app/shared/cache';

@Component({
  selector: 'app-customer-index',
  templateUrl: './customer-index.component.html',
  styleUrls: ['./customer-index.component.scss']
})
export class CustomerIndexComponent extends Crud implements OnInit, AfterViewInit {

  data: any = { data: [] };
  doc: any = document;
  $: any = $;
  categories: any = [];
  status: any = [];
  messages: any = [];

  selectedCategory: HashTable<any, any> = new HashTable<any, any>();
  selectedStatus: HashTable<any, any> = new HashTable<any, any>();

  selectMode: any = false;
  isSelectAll: any = false;

  @ViewChild('customerContainer') customerContainer: ElementRef;
  @ViewChild('filterMenu') filterMenu: ElementRef;

  reloadCategory: any;
  reloadStatus: any;
  isExpanded: any = false;

  constructor(public service: GlobalService) {
    super(service);
    this.baseApiUrl = "customers";
    this.paging = true;

    this.reloadCategory = () => {
      this.loadCategory();
    };
    this.reloadStatus = () => {
      this.loadStatus();
    };
  }

  loadCategory() {
    this.service.get("categories").subscribe(res => {
      this.categories = res;
    });
  }

  loadStatus() {
    this.service.get("status").subscribe(res => {
      this.status = res;
    });
  }

  loadMessages() {
    this.service.get("messages").subscribe((res: any) => {
      this.messages = res.data;
    });
  }

  ngOnInit(): void {
    this.get(true);
    this.loadCategory();
    this.loadStatus();
    this.loadMessages();
  }

  ngAfterViewInit() {
    let navbarHeight = 100;
    this.customerContainer.nativeElement.style.height = (window.innerHeight - navbarHeight) + "px";
    this.filterMenu.nativeElement.style.height = (window.innerHeight - navbarHeight) + "px";
  }

  toggle(className: any) {
    this.$("."+className).slideToggle(300);
  }

  toggleFilter(item:any, type) {
    if (type == 'CATEGORY') {
      if (this.selectedCategory.has(item.id)) {
        this.selectedCategory.remove(item.id);
      } else {
        this.selectedCategory.put(item.id, item);
      }
    }
    if (type == 'STATUS') {
      if (this.selectedStatus.has(item.id)) {
        this.selectedStatus.remove(item.id);
      } else {
        this.selectedStatus.put(item.id, item);
      }
    }

    this.filter.status = this.selectedStatus.getKeys();
    this.filter.categories = this.selectedCategory.getKeys();

    this.get(true);
  }

  toggleSelectMode() {
    if (this.selectMode) {
      Cache.set("selectMode", "0");
      this.selectMode = false;
    } else {
      Cache.set("selectMode", "1");
      this.selectMode = true;
    }
  }

  selectedAll() {
    this.response.data.forEach(element => {
      element.selected = true;
      this.selectedResources.put(element.id, element);
    });
    this.isSelectAll = true;
  }

  deSelectedAll() {
    this.response.data.forEach(element => {
      element.selected = false;
      this.selectedResources.remove(element.id);
    });
    this.isSelectAll = false;
  }

  expandAll() {
    if (this.isExpanded) {
      this.isExpanded = false;
      this.$('.more-detail').slideUp(300);
    }
    else {
      this.isExpanded = true;
      this.$('.more-detail').slideDown(300);
    }
  }

  setPageLength() {
    let value = prompt("ادخل عدد العملاء فى الصفحة");

    if (value) {
      this.filter.page_length = value;
      this.get();
    }
  }

  sendMail() {
    this.$('#selectMessageModal').modal('show');
  }

  sort(col) {
    this.filter.sort = col;
    this.get(true);
  }


}
