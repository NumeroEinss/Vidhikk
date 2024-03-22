import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-case-diary-login',
  templateUrl: './case-diary-login.component.html',
  styleUrl: './case-diary-login.component.scss'
})
export class CaseDiaryLoginComponent {

  caseDiaryForm: FormGroup;
  hide: boolean = true;

  constructor(private _formBuilder: FormBuilder) {
    this.caseDiaryForm = this._formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(10)])
    });
  }

  ngAfterViewInit() {
    let element = document.getElementById('confidentialityButton') as HTMLElement;
    element.click();
  }
}





