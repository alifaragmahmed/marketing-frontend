import { Component, Input, OnInit } from '@angular/core';
import { Crud } from '../../shared/helpers/crud';
import { GlobalService } from '../../shared/services/global.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent extends Crud implements OnInit {

  @Input() data: any = [];
  @Input() reload: any;

  constructor(public service: GlobalService) {
    super(service);
    this.baseApiUrl = "status";
  }

  ngOnInit() {
  }

  getAction(res) {
    this.create();

    if (this.reload)
      this.reload();
  }

}
