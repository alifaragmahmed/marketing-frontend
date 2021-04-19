import { Component, Input, OnInit } from '@angular/core';
import { Crud } from '../../shared/helpers/crud';
import { GlobalService } from '../../shared/services/global.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent extends Crud implements OnInit {

  @Input() data: any = [];
  @Input() reload: any;

  constructor(public service: GlobalService) {
    super(service);
    this.baseApiUrl = "categories";
  }

  ngOnInit() {
  }

  getAction(res) {
    this.create();

    if (this.reload)
      this.reload();
  }

}
