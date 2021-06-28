import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';

import { LoginComponent } from './login.component';
import { EssentialReactiveFormModule } from '../../../../../shared/modules/essential-reactive-form/essential-reactive-form.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRoutingModule, EssentialReactiveFormModule],
})
export class LoginModule {}
