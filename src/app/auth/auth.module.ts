import {NgModule} from '@angular/core';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './components/login/login.component';
import {SharedModule} from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
    MatButtonModule
  ]
})
export class AuthModule {
}
