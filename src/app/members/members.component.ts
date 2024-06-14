import { Component, AfterViewInit } from '@angular/core';
import { ToastMessageService } from '../shared/services/snack-alert.service';
import { ApolloService } from '../shared/services/apollo.service';
import { GQLConfig } from '../graphql.operations';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss',
})
export class MembersComponent implements AfterViewInit {
  selectedMember: any = {};
  memberList: any = [];
  filteredLawyerList: any = [];
  lawyerList: any = [];

  places = [
    { value: 'indore', viewValue: 'Indore' },
    { value: 'bhopal', viewValue: 'Bhopal' },
    { value: 'mumbai', viewValue: 'Mumbai' },
  ];

  practiseField = [
    { value: 'civil', viewValue: 'Civil' },
    { value: 'finance', viewValue: 'Finance' },
    { value: 'civil', viewValue: 'Civil' },
  ];

  place: string = "";
  practisingField: string = "";
  popularity: string = "";
  experience: string = "";

  constructor(private _toastMessage: ToastMessageService, private _apolloService: ApolloService) {
    this.getAllLawyersList();
    this.getMembersList();
  }

  ngAfterViewInit() {
    let element = document.getElementById('modalButton1') as HTMLElement;
    element.click();
  }

  addMember(member: any) {
    let userData = localStorage.getItem('userData');
    let parsedData = userData ? JSON.parse(userData) : {}
    let data = {
      lawyerId: parsedData._id,
      memberId: member.lawyerId
    };
    this._apolloService.mutate(GQLConfig.addMember, data).subscribe((resObj) => {
      if (resObj.data != null) {
        if (resObj.data.addMember.status == 200) {
          this._toastMessage.success(resObj.data.addMember.message);
          this.getMembersList();
        }
        else {
          this._toastMessage.error(resObj.data.addMember.message);
        }
      }
    })
  }

  deleteMember(member: any) {
    let userData = localStorage.getItem('userData');
    let parsedData = userData ? JSON.parse(userData) : {}
    let data = {
      lawyerId: parsedData._id,
      memberId: member.memberId
    };
    this._apolloService.mutate(GQLConfig.deleteMember, data).subscribe(resObj => {
      if (resObj.data != null) {
        if (resObj.data.deleteMember.status == 200) {
          this._toastMessage.success(resObj.data.deleteMember.message);
          this.getMembersList();
        }
        else {
          this._toastMessage.error(resObj.data.deleteMember.message);
        }
      }
    })
  }

  filterLawyers(e: any) {
    let filter = e.target.value.toLowerCase();
    this.filteredLawyerList = this.lawyerList.filter((key: any) =>
      key.memberName.toLowerCase().startsWith(filter)
    );
  }

  getAllLawyersList() {
    let userData = localStorage.getItem('userData');
    let parsedData = userData ? JSON.parse(userData) : {}
    this._apolloService.mutate(GQLConfig.getLawyersList, { lawyerId: parsedData._id }).subscribe(resObj => {
      if (resObj.data != null) {
        if (resObj.data.lawyersList.status == 200) {
          this.lawyerList = resObj.data.lawyersList.data.lawyerList;
          this.lawyerList.forEach((element: any) => {
            element.experience = 0;
          });
          this.filteredLawyerList = this.lawyerList;
        }
        else {
          this._toastMessage.error(resObj.data.lawyersList.message);
        }
      }
    })
  }

  getMembersList() {
    let userData = localStorage.getItem('userData');
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

  trackById(index: number, member: any) {
    return member.memberId;
  }

  getFilteredLawyerList() {
    let userData = localStorage.getItem('userData');
    let parsedData = userData ? JSON.parse(userData) : {};
    let data = {
      lawyerId: parsedData._id,
      experience: this.experience,
      place: this.place,
      practicingField: this.practisingField
    }
    this._apolloService.mutate(GQLConfig.getFilteredList, data).subscribe(resObj => {
      if (resObj.data != null) {
        if (resObj.data.filterLawyerList.status == 200) {
          this.filteredLawyerList = resObj.data.filterLawyerList.data.lawyerList;
          let button = document.getElementById('modalButton') as HTMLElement;
          button.click();
        }
      }
    })
  }
}
