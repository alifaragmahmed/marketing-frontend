import { Component, Input, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { Request } from 'src/app/shared/request';
import { Crud } from '../../../shared/helpers/crud';
import { GlobalService } from '../../../shared/services/global.service';
import { Message } from '../../../shared/message';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent extends Crud implements OnInit, AfterViewInit, OnChanges {

  @Input() resource: any = [];
  @Input() reload: any;

  type: any = false;

  constructor(public service: GlobalService) {
    super(service);
    this.baseApiUrl = "messages";
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initEditor();
  }

  ngOnChanges() {
    this.doc.CKEDITOR.instances.editor1.setData(this.resource.message);
  }

  initEditor() {
    this.doc.CKEDITOR.replace( 'editor1' );
  }

  send(item) {
    item.message = !this.type? this.doc.CKEDITOR.instances.editor1.getData() : this.resource.message;
    super.send(item);
  }

  storeAction(res) {
    this.initEditor();
  }

  updateAction(res) {
    this.initEditor();
  }

  getAction() {
    this.initEditor();
    if (this.reload)
      this.reload();
  }

  toggleType() {
    if (this.type) {
      this.$('#cke_editor1').hide();
    } else {
      this.$('#cke_editor1').show();
      this.initEditor();
    }
  }
}
