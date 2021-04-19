import { Component, Inject, OnChanges, SimpleChanges, OnInit} from '@angular/core';
import { Auth } from '../shared/auth';
import { Router } from '../../../node_modules/@angular/router';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements  OnInit {

  constructor(
  private router: Router) {
    //
  }

  watchUser() {
    console.log(Auth.getApiToken());
    if (!Auth.getApiToken())
      this.router.navigate(['/auth/login'], {
      }).then().catch();
  }

  ngOnInit() {

  }


  init() {
  }


}
