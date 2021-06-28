import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MinutaRoutingModule } from './minuta-routing.module';
import { MinutaComponent } from './minuta.component';
import { EssentialReactiveFormModule } from '../../../shared/modules/essential-reactive-form/essential-reactive-form.module';
import { CrearMinutaComponent } from './components/crear-minuta/crear-minuta.component';
import { ListMinutaComponent } from './components/list-minuta/list-minuta.component';
import { TemplateFormComponent } from './components/template-form/template-form.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MinutaComponent,
    CrearMinutaComponent,
    ListMinutaComponent,
    TemplateFormComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MinutaRoutingModule,
    EssentialReactiveFormModule,
  ],
})
export class MinutaModule {}
