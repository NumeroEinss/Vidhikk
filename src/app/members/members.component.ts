import { Component, AfterViewInit } from '@angular/core';
import { SnackAlertService } from '../shared/services/snack-alert.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss',
})
export class MembersComponent implements AfterViewInit {
  selectedMember: any = {};

  memberList = [
    {
      id: 1,
      image: '../../assets/images/image/anurag_goyal.jpg',
      memberName: 'Anil Pandey',
      icon: '../../assets/images/icons/lock_member.svg',
      contactNo: 'Profile Lock',
      emailIcon: '../../assets/images/icons/lock_member.svg',
      emailDetails: 'Profile Lock',
      designation: 'Corporate Lawyer',
      branch: 'Pune',
    },
    {
      id: 2,
      image: '../../assets/images/image/add_member2.png',
      memberName: 'Bhushan Singh',
      icon: '../../assets/images/icons/call_member.svg',
      contactNo: '+91-456-789-4560',
      emailIcon: '../../assets/images/icons/mail_member.svg',
      emailDetails: 'bhushansingh1@gmail.com',
      designation: 'Civil Lawyer',
      branch: 'Goa',
    },
    {
      id: 3,
      image: '../../assets/images/image/add_member.png',
      memberName: 'Kunal Thakre',
      icon: '../../assets/images/icons/call_member.svg',
      contactNo: '+91-456-789-4560',
      emailIcon: '../../assets/images/icons/mail_member.svg',
      emailDetails: 'kunalthakre1@gmail.com',
      designation: 'Employement Lawyer',
      branch: 'Mumbai',
    },
    {
      id: 4,
      image: '../../assets/images/image/anurag_goyal.jpg',
      memberName: 'Vinit Upadhyaya',
      icon: '../../assets/images/icons/lock_member.svg',
      contactNo: 'Profile Lock',
      emailIcon: '../../assets/images/icons/lock_member.svg',
      emailDetails: 'Profile Lock',
      designation: 'Criminal Lawyer',
      branch: 'Pune',
    },
    {
      id: 5,
      image: '../../assets/images/image/add_member.png',
      memberName: 'Manika Da',
      icon: '../../assets/images/icons/lock_member.svg',
      contactNo: 'Profile Lock',
      emailIcon: '../../assets/images/icons/mail_member.svg',
      emailDetails: 'manikada32@gmail.com',
      designation: 'Civil Lawyer',
      branch: 'Pune',
    },
    {
      id: 6,
      image: '../../assets/images/image/add_member2.png',
      memberName: 'Kunal Thakre',
      icon: '../../assets/images/icons/call_member.svg',
      contactNo: '+91-456-789-4560',
      emailIcon: '../../assets/images/icons/mail_member.svg',
      emailDetails: 'kunalthakre1@gmail.com',
      designation: 'Employement Lawyer',
      branch: 'Mumbai',
    },
    {
      id: 7,
      image: '../../assets/images/image/anurag_goyal.jpg',
      memberName: 'Kunal Thakre',
      icon: '../../assets/images/icons/call_member.svg',
      contactNo: '+91-456-789-4560',
      emailIcon: '../../assets/images/icons/mail_member.svg',
      emailDetails: 'kunalthakre1@gmail.com',
      designation: 'Employement Lawyer',
      branch: 'Mumbai',
    },
    {
      id: 8,
      image: '../../assets/images/image/add_member.png',
      memberName: 'Kunal Thakre',
      icon: '../../assets/images/icons/call_member.svg',
      contactNo: '+91-456-789-4560',
      emailIcon: '../../assets/images/icons/mail_member.svg',
      emailDetails: 'kunalthakre1@gmail.com',
      designation: 'Employement Lawyer',
      branch: 'Mumbai',
    },
  ];

  memberDetails = [
    {
      image: '../../assets/images/image/add_member.png',
      memberName: 'Harish Salve',
      lawyerTypeImg: '../../assets/images/icons/lawyer_type.svg',
      lawyerType: 'Criminal Lawyer',
      experienceImg: '../../assets/images/icons/member_experience.svg',
      experience: '10+ Experience',
      ratingStar: '../../assets/images/icons/yellow_star.svg',
      rating: '(4.5)',
      icon: '../../assets/images/icons/lock_member.svg',
      contactNo: 'Profile Lock',
      emailIcon: '../../assets/images/icons/lock_member.svg',
      emailDetails: 'Profile Lock',
      designation: 'Corporate Lawyer',
      branch: 'Pune',
    },
    {
      image: '../../assets/images/image/add_member2.png',
      memberName: 'Mukul Rohatagi',
      lawyerTypeImg: '../../assets/images/icons/lawyer_type.svg',
      lawyerType: 'Diverse Lawyer',
      experienceImg: '../../assets/images/icons/member_experience.svg',
      experience: '10+ Experience',
      ratingStar: '../../assets/images/icons/yellow_star.svg',
      rating: '(4.0)',
      icon: '../../assets/images/icons/call_member.svg',
      contactNo: '+91-456-789-4560',
      emailIcon: '../../assets/images/icons/mail_member.svg',
      emailDetails: 'kunalthakre1@gmail.com',
      designation: 'Employement Lawyer',
      branch: 'Mumbai',
    },
    {
      image: '../../assets/images/image/add_member.png',
      memberName: 'Amit Sharma',
      lawyerTypeImg: '../../assets/images/icons/lawyer_type.svg',
      lawyerType: 'Criminal Lawyer',
      experienceImg: '../../assets/images/icons/member_experience.svg',
      experience: '10+ Experience',
      ratingStar: '../../assets/images/icons/yellow_star.svg',
      rating: '(4.3)',
      icon: '../../assets/images/icons/lock_member.svg',
      contactNo: 'Profile Lock',
      emailIcon: '../../assets/images/icons/mail_member.svg',
      emailDetails: 'manikada32@gmail.com',
      designation: 'Civil Lawyer',
      branch: 'Pune',
    },
    {
      image: '../../assets/images/image/add_member2.png',
      memberName: 'Shashank Rawal',
      lawyerTypeImg: '../../assets/images/icons/lawyer_type.svg',
      lawyerType: 'Divorce Lawyer',
      experienceImg: '../../assets/images/icons/member_experience.svg',
      experience: '10+ Experience',
      ratingStar: '../../assets/images/icons/yellow_star.svg',
      rating: '(4.5)',
      icon: '../../assets/images/icons/lock_member.svg',
      contactNo: 'Profile Lock',
      emailIcon: '../../assets/images/icons/lock_member.svg',
      emailDetails: 'Profile Lock',
      designation: 'Corporate Lawyer',
      branch: 'Pune',
    },
    {
      image: '../../assets/images/image/add_member.png',
      memberName: 'kapil Sibal',
      lawyerTypeImg: '../../assets/images/icons/lawyer_type.svg',
      lawyerType: 'Criminal Lawyer',
      experienceImg: '../../assets/images/icons/member_experience.svg',
      experience: '10+ Experience',
      ratingStar: '../../assets/images/icons/yellow_star.svg',
      rating: '(4.8)',
      icon: '../../assets/images/icons/call_member.svg',
      contactNo: '+91-456-789-4560',
      emailIcon: '../../assets/images/icons/mail_member.svg',
      emailDetails: 'kunalthakre1@gmail.com',
      designation: 'Employement Lawyer',
      branch: 'Mumbai',
    },
    {
      image: '../../assets/images/image/add_member.png',
      memberName: 'kapil Sibal',
      lawyerTypeImg: '../../assets/images/icons/lawyer_type.svg',
      lawyerType: 'Criminal Lawyer',
      experienceImg: '../../assets/images/icons/member_experience.svg',
      experience: '10+ Experience',
      ratingStar: '../../assets/images/icons/yellow_star.svg',
      rating: '(4.8)',
      icon: '../../assets/images/icons/lock_member.svg',
      contactNo: 'Profile Lock',
      emailIcon: '../../assets/images/icons/mail_member.svg',
      emailDetails: 'manikada32@gmail.com',
      designation: 'Civil Lawyer',
      branch: 'Pune',
    },
  ];

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

  constructor(private _toastMessage: SnackAlertService,) { }

  ngAfterViewInit() {
    let element = document.getElementById('modalButton1') as HTMLElement;
    element.click();
  }

  addMember(member: any) {
    this.memberList.unshift(member)
  }

  deleteMember() {
    this.memberList.forEach((x: any, index: any) => {
      if (x.id == this.selectedMember.id) {
        this.memberList.splice(index, 1)
      }
      this._toastMessage.message('Member Deleted Successfully!!');
    })
  }
}
