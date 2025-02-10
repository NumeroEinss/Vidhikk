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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShareButtons } from 'ngx-sharebuttons/buttons';
import { shareIcons } from 'ngx-sharebuttons/icons';
import { SubscriptionPlanComponent } from './component/subscription-plan/subscription-plan.component';
import { QrModalComponent } from './component/qr-modal/qr-modal.component';
import { HighlightOnSearchPipe } from './pipe/highlight-on-search.pipe';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { RouterModule } from '@angular/router';
import { YearPickerComponent } from './component/year-picker/year-picker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { QRCodeModule } from 'angularx-qrcode';
import { DeleteUserComponent } from './component/delete-user/delete-user.component';
import { PrivacyPolicyComponent } from './component/privacy-policy/privacy-policy.component';


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
    PreventKeyboardEventsDirective,
    SubscriptionPlanComponent,
    QrModalComponent,
    HighlightOnSearchPipe,
    LandingPageComponent,
    YearPickerComponent,
    DeleteUserComponent,
    PrivacyPolicyComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgScrollbarModule,
    MatChipsModule,
    FormsModule,
    ShareButtons,
    RouterModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    QRCodeModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NgScrollbarModule,
    HighlighterPipe,
    PaginatorComponent,
    SafeHTMLPipe,
    PreventKeyboardEventsDirective,
    ShareButtons,
    SubscriptionPlanComponent,
    QrModalComponent,
    HighlightOnSearchPipe,
    YearPickerComponent,
  ],
  providers: [AuthService, shareIcons()]
})
export class SharedModule { }
