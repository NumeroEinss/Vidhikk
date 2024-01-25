import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

const elements = [MatTabsModule, MatFormFieldModule, MatButtonModule, MatIconModule, MatInputModule,
  MatGridListModule, MatDialogModule, MatSelectModule, MatDividerModule, MatMenuModule, MatCheckboxModule,
  MatRadioModule];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    elements
  ],
  exports: [elements]
})


export class MaterialModule { }
