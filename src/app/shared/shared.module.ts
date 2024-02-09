import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { NgScrollbarModule } from 'ngx-scrollbar';


@NgModule({
  declarations: [
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgScrollbarModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NgScrollbarModule
  ]
})
export class SharedModule { }
