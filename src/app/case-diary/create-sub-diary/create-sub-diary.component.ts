import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-sub-diary',
  templateUrl: './create-sub-diary.component.html',
  styleUrl: './create-sub-diary.component.scss'
})
export class CreateSubDiaryComponent {

  createSubDiaryForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.createSubDiaryForm = new FormGroup({
      caseName: new FormControl('', [Validators.required]),
      memberName: new FormControl('', [Validators.required])
    }
    );
  }

  caseList: any[] = [
    { value: 'civil', viewValue: 'Civil' },
    { value: 'finance', viewValue: 'Finance' },
    { value: 'taxation', viewValue: 'Taxation' },
  ];

  memberList: any[] = [
    { value: 'anilSoni', viewValue: 'Anil Soni' },
    { value: 'nitinNainwal', viewValue: 'Nitin Nainwal' },
    { value: 'anjaliSharma', viewValue: 'Anjali Sharma' },
  ];


  get createSubDiaryFormCtrl() {
    return this.createSubDiaryForm.controls
  }

}
