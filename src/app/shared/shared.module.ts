import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { GlobalSearchComponent } from './component/global-search/global-search.component';
import { MatChipsModule } from '@angular/material/chips';
import { TableComponent } from './component/table/table.component';
import { AuthService } from './services/auth.service';
import { HighlighterPipe } from './pipe/highlighter.pipe';


@NgModule({
  declarations: [
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    GlobalSearchComponent,
    TableComponent,
    HighlighterPipe
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
    NgScrollbarModule,
    HighlighterPipe
  ],
  providers: [AuthService]
})
export class SharedModule { }
