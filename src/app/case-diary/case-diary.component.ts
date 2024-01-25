import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-case-diary',
  templateUrl: './case-diary.component.html',
  styleUrl: './case-diary.component.scss'
})

export class CaseDiaryComponent {

  caseDiaryForm: FormGroup;
  hide: boolean = true;

  constructor(private _formBuilder: FormBuilder) {
    this.caseDiaryForm = this._formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(10)])
    });

  }

  // get formControl(){
  //   this.caseDiaryForm.controls
  // }

}
