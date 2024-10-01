import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseLawRoutingModule } from './case-law-routing.module';
import { CaseLawListComponent } from './case-law-list/case-law-list.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CaseLawDetailComponent } from './case-law-detail/case-law-detail.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HighlighterPipe } from '../shared/pipe/highlighter.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SavedCaseLawDetailComponent } from './saved-case-law-detail/saved-case-law-detail.component';
import { HighlightOnSearchPipe } from '../shared/pipe/highlight-on-search.pipe';

@NgModule({
  declarations: [
    CaseLawListComponent,
    CaseLawDetailComponent,
    SavedCaseLawDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CaseLawRoutingModule,
    SharedModule,
    MaterialModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatTooltipModule
  ],
  providers: [HighlighterPipe, HighlightOnSearchPipe]
})
export class CaseLawModule { }
