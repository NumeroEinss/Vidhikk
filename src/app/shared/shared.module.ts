import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { GlobalSearchComponent } from './component/global-search/global-search.component';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  declarations: [
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    GlobalSearchComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgScrollbarModule,
    MatChipsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NgScrollbarModule
  ]
})
export class SharedModule { }
