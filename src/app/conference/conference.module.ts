import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConferenceRoutingModule } from './conference-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConferenceComponent } from './conference.component';
import { ConferenceListComponent } from './conference-list/conference-list.component';
import { CountdownComponent } from 'ngx-countdown';

@NgModule({
  declarations: [ConferenceComponent, ConferenceListComponent],
  imports: [
    CommonModule,
    ConferenceRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CountdownComponent
  ],
})
export class ConferenceModule {}
