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
import { PaginatorComponent } from './component/paginator/paginator.component';
import { SafeHTMLPipe } from './pipe/safe-html.pipe';
import { PreventKeyboardEventsDirective } from './directives/prevent-keyboard-events.directive';
import { FormsModule } from '@angular/forms';

import { ShareButtons } from 'ngx-sharebuttons/buttons';
import { shareIcons } from 'ngx-sharebuttons/icons';


@NgModule({
  declarations: [
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    GlobalSearchComponent,
    TableComponent,
    HighlighterPipe,
    PaginatorComponent,
    SafeHTMLPipe,
    PreventKeyboardEventsDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgScrollbarModule,
    MatChipsModule,
    FormsModule,
    ShareButtons
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NgScrollbarModule,
    HighlighterPipe,
    PaginatorComponent,
    SafeHTMLPipe,
    PreventKeyboardEventsDirective,
    ShareButtons
  ],
  providers: [AuthService, shareIcons()]
})
export class SharedModule { }
