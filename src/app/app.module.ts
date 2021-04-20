import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { httpInterceptorProviders } from './shared/interceptors';
import { SharedModule } from './shared/shared.module';
import { AuthGuestService } from './shared/middlewares/auth-guest.service';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AuthService } from './shared/services/auth.service';
import { LayoutComponent } from './core/layout.component';
import { AppComponent } from './core/app.component';
import { AuthComponent } from './core/auth.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { TranslationService } from './shared/services/translation.service';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule, MAT_CHECKBOX_CLICK_ACTION} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { DataTablesModule } from '../../node_modules/angular-datatables';
import { SystemLabelComponent } from './core/components/system-label/system-label.component';
import { Router } from '@angular/router';
import { Auth } from './shared/auth';
import { Translation } from './shared/translation';
import { Request } from './shared/request';
import { Cache } from './shared/cache';
import { Helper } from './shared/helper';
import { CustomerIndexComponent } from './components/customer/customer-index/customer-index.component';
import { CustomerItemComponent } from './components/customer/customer-item/customer-item.component';
import { CustomerAddComponent } from './components/customer/customer-add/customer-add.component';
import { CategoryComponent } from './components/category/category.component';
import { StatusComponent } from './components/status/status.component';
import { MessageIndexComponent } from './components/message/message-index/message-index.component';
import { MessageFormComponent } from './components/message/message-form/message-form.component';
import { SelectMessageComponent } from './components/customer/select-message/select-message.component';
import { SendWhatsappMessageComponent } from './components/customer/send-whatsapp-message/send-whatsapp-message.component';
import { MatSlideToggleModule } from '@angular/material';

@NgModule({
  declarations: [
    LayoutComponent,
    AuthComponent,
    AppComponent,
    PageNotFoundComponent,
    SystemLabelComponent,
    CustomerIndexComponent,
    CustomerItemComponent,
    CustomerAddComponent,
    CategoryComponent,
    StatusComponent,
    MessageIndexComponent,
    MessageFormComponent,
    SelectMessageComponent,
    SendWhatsappMessageComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
    DataTablesModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
  providers: [
    httpInterceptorProviders,
    TranslationService,
    AuthService,
    AuthGuestService,
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  public static doc: any = document;

  constructor(private router: Router,
    private translationService: TranslationService) {


    // check on ssl
    //this.activeSSL();

    if (!Auth.getApiToken())
      this.router.navigate(['/auth/login'], {
      }).then().catch();

    // load local translations
    Translation.TRANSLATION_DATA = Cache.has(Translation.TRANSLATION_CACHE_KEY)? Cache.get(Translation.TRANSLATION_CACHE_KEY) : {};


    // load online translations
    this.translationService.get().subscribe((r) => {
      Cache.remove(Translation.TRANSLATION_CACHE_KEY);
      Cache.set(Translation.TRANSLATION_CACHE_KEY, r);
      Translation.TRANSLATION_DATA = r;
      //
      console.log('translation loaded');
      Helper.refreshComponent(this.router, window.location.pathname);
    });

    // prevent context menu
    this.preventClickJection();
  }


  // prevent context menu
  preventClickJection() {
    if (window.location.host.indexOf('localhost') >= 0)
      return;
    document.oncontextmenu = function(e){ e.preventDefault(); };
  }

  activeSSL() {
    let canActivateSSL = true;

    if (window.location.host.indexOf('localhost') >= 0)
      canActivateSSL = false;

    if (window.location.protocol.indexOf('https') >= 0)
      canActivateSSL = false;

    if (canActivateSSL)
      window.location.href = window.location.href.replace("http", "https");
  }

  reloadIfConsoleOpen() {
    if (this.isConsoleOpen()) {
        window.location.href = "https://www.youtube.com/watch?v=6YCq549gdT0";
    };
  }

  isConsoleOpen() {
    var startTime: any = new Date();
    debugger;
    var endTime: any = new Date();

    return endTime - startTime > 100;
  }



}
