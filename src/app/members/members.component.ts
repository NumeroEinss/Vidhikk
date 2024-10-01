import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ToastMessageService } from '../shared/services/snack-alert.service';
import { ApolloService } from '../shared/services/apollo.service';
import { GQLConfig } from '../graphql.operations';
import { HttpClient } from '@angular/common/http';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss',
})
export class MembersComponent implements AfterViewInit {

  @ViewChild('searchInput', { static: true })
  public searchInput!: ElementRef;
  selectedMember: any = {};
  memberList: any = [];
  filteredLawyerList: any = [];
  lawyerList: any = [];

  places: any = [];

  practiseField: any = [];

  place: string = "";
  practisingField: string = "";
  popularity: string = "";
  experience: string = "";

  constructor(private _toastMessage: ToastMessageService, private _apolloService: ApolloService,
    private _http: HttpClient) {
    this.getAllLawyersList();
    this.getMembersList();
    this.getCityList();
    this.getPractiscingField();
  }

  ngAfterViewInit() {
    // let element = document.getElementById('modalButton1') as HTMLElement;
    // element.click();
  }

  addMember(member: any) {
    let userData = sessionStorage.getItem('userData');
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
    let userData = sessionStorage.getItem('userData');
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
      key.lawyerName.toLowerCase().startsWith(filter)
    );
  }

  getAllLawyersList() {
    let userData = sessionStorage.getItem('userData');
    let parsedData = userData ? JSON.parse(userData) : {}
    this._apolloService.mutate(GQLConfig.getLawyersList, { lawyerId: parsedData._id }).subscribe(resObj => {
      if (resObj.data != null) {
        if (resObj.data.lawyersList.status == 200) {
          this.lawyerList = resObj.data.lawyersList.data.lawyerList;
          this.filteredLawyerList = this.lawyerList;
        }
        else {
          this._toastMessage.error(resObj.data.lawyersList.message);
        }
      }
    })
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

  trackById(index: number, member: any) {
    return member.memberId;
  }

  getFilteredLawyerList() {
    let userData = sessionStorage.getItem('userData');
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
        else {
          this._toastMessage.error(resObj.data.filterLawyerList.message)
        }
      }
    })
  }

  getCityList() {
    this._http.get('assets/JSON/cities.json').subscribe({
      next: (data) => {
        this.places = data;
      },
      error: (error) => { this._toastMessage.error(error) }
    })
  }

  getPractiscingField() {
    this._http.get('assets/JSON/practiscing_field.json').subscribe({
      next: (data) => {
        this.practiseField = data;
      },
      error: (error) => { this._toastMessage.error(error) }
    })
  }

  getShortInfo(info: string) {
    return info.slice(0, 15);
  }

  resetMemberPopup() {
    this.filteredLawyerList = this.lawyerList;
    this.searchInput.nativeElement.value = '';
  }
}
