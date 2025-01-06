import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GQLConfig } from '../../graphql.operations';
import { ApolloService } from '../../shared/services/apollo.service';
import { ToastMessageService } from '../../shared/services/snack-alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-sub-diary',
  templateUrl: './create-sub-diary.component.html',
  styleUrl: './create-sub-diary.component.scss'
})
export class CreateSubDiaryComponent {

  createSubDiaryForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _apolloService: ApolloService, private _toastMessage: ToastMessageService,
    private _router: Router) {
    this.createSubDiaryForm = new FormGroup({
      caseDiaryId: new FormControl('', [Validators.required]),
      memberId: new FormControl('', [Validators.required])
    });
    this.getCaseDiaryList();
    this.getMembersList();
  }

  caseList: any[] = [
    // { value: 'civil', viewValue: 'Civil' },
    // { value: 'finance', viewValue: 'Finance' },
    // { value: 'taxation', viewValue: 'Taxation' },
  ];

  memberList: any[] = [
    // { value: 'anilSoni', viewValue: 'Anil Soni' },
    // { value: 'nitinNainwal', viewValue: 'Nitin Nainwal' },
    // { value: 'anjaliSharma', viewValue: 'Anjali Sharma' },
  ];


  get createSubDiaryFormCtrl() {
    return this.createSubDiaryForm.controls
  }

  createSubDiary() {
    let userData = sessionStorage.getItem('userData');
    let parsedData = userData ? JSON.parse(userData) : {};
    let data = {
      lawyerId: parsedData._id,
      caseDiaryId: this.createSubDiaryForm.controls.caseDiaryId.value,
      memberId: this.createSubDiaryForm.controls.memberId.value
    };
    if (this.createSubDiaryForm.valid) {
      this._apolloService.mutate(GQLConfig.createSubDiary, data).subscribe(objRes => {
        if (objRes.data != null) {
          if (objRes.data.createSubDiary.status == 200) {
            this._toastMessage.success(objRes.data.createSubDiary.message);
            this._router.navigate(['lawyer/case-diary/cases'], { state: { diaryType: 'subDiary' } });
          }
          else {
            this._toastMessage.error(objRes.data.createSubDiary.message);
          }
        }
      })
    }
    else {
      this._toastMessage.error('Select all fields !!');
    }
  }

  getCaseDiaryList() {
    let userData = sessionStorage.getItem('userData');
    let parsedData = userData ? JSON.parse(userData) : {};
    this._apolloService.mutate(GQLConfig.getCaseDiaryList, { lawyerId: parsedData._id }).subscribe((data) => {
      if (data.data != null) {
        if (data.data.getCaseDiaryList.status == 200) {
          this.caseList = data.data.getCaseDiaryList.data.caseDiaryList.result;
        }
        else {
          this._toastMessage.error(data.data.getCaseDiaryList.message);
        }
      }
    });
  }

  getMembersList() {
    let userData = sessionStorage.getItem('userData');
    let parsedData = userData ? JSON.parse(userData) : {}
    this._apolloService.mutate(GQLConfig.getMemberList, { lawyerId: parsedData._id }).subscribe(resObj => {
      if (resObj.data != null) {
        if (resObj.data.getListMember.status == 200) {
          this.memberList = resObj.data.getListMember.data.memberList;
        }
        else {
          this._toastMessage.error(resObj.data.getListMember.message);
        }
      }
    })
  }
}
