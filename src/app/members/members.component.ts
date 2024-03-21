import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss',
})
export class MembersComponent implements AfterViewInit {
  memberList = [
    {
      image: '../../assets/images/image/anurag_goyal.jpg',
      memberName: 'Apoorva Pandey',
      icon: '../../assets/images/icons/lock_member.svg',
      contactNo: 'Profile Lock',
      emailIcon: '../../assets/images/icons/lock_member.svg',
      emailDetails: 'Profile Lock',
      designation: 'Corporate Lawyer',
      branch: 'Pune',
    },
    {
      image: '../../../assets/images/image/anurag_goyal.jpg',
      memberName: 'Bhushan Singh',
      icon: '../../assets/images/icons/call_member.svg',
      contactNo: '+91-456-789-4560',
      emailIcon: '../../assets/images/icons/mail_member.svg',
      emailDetails: 'bhushansingh1@gmail.com',
      designation: 'Civil Lawyer',
      branch: 'Goa',
    },
    {
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
      image: '../../assets/images/image/anurag_goyal.jpg',
      memberName: 'Archana Upadhyaya',
      icon: '../../assets/images/icons/lock_member.svg',
      contactNo: 'Profile Lock',
      emailIcon: '../../assets/images/icons/lock_member.svg',
      emailDetails: 'Profile Lock',
      designation: 'Criminal Lawyer',
      branch: 'Pune',
    },
    {
      image: '../../assets/images/image/anurag_goyal.jpg',
      memberName: 'Manika Da',
      icon: '../../assets/images/icons/lock_member.svg',
      contactNo: 'Profile Lock',
      emailIcon: '../../assets/images/icons/mail_member.svg',
      emailDetails: 'manikada32@gmail.com',
      designation: 'Civil Lawyer',
      branch: 'Pune',
    },
    {
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
      image: '../../assets/images/image/anurag_goyal.jpg',
      memberName: 'Kunal Thakre',
      icon: '../../assets/images/icons/call_member.svg',
      contactNo: '+91-456-789-4560',
      emailIcon: '../../assets/images/icons/mail_member.svg',
      emailDetails: 'kunalthakre1@gmail.com',
      designation: 'Employement Lawyer',
      branch: 'Mumbai',
    }
  ];

  memberDetails = [
    {
      image: '../../assets/images/image/add_member.png',
      name: 'Harish Salve',
      lawyerTypeImg: '../../assets/images/icons/lawyer_type.svg',
      lawyerType: 'Criminal Lawyer',
      experienceImg: '../../assets/images/icons/member_experience.svg',
      experience: '10+ Experience',
      ratingStar: '../../assets/images/icons/yellow_star.svg',
      rating: '(4.5)',
    },
    {
      image: '../../assets/images/image/add_member2.png',
      name: 'Mukul Rohatagi',
      lawyerTypeImg: '../../assets/images/icons/lawyer_type.svg',
      lawyerType: 'Diverse Lawyer',
      experienceImg: '../../assets/images/icons/member_experience.svg',
      experience: '10+ Experience',
      ratingStar: '../../assets/images/icons/yellow_star.svg',
      rating: '(4.0)',
    },
    {
      image: '../../assets/images/image/add_member.png',
      name: 'Amit Sharma',
      lawyerTypeImg: '../../assets/images/icons/lawyer_type.svg',
      lawyerType: 'Criminal Lawyer',
      experienceImg: '../../assets/images/icons/member_experience.svg',
      experience: '10+ Experience',
      ratingStar: '../../assets/images/icons/yellow_star.svg',
      rating: '(4.3)',
    },
    {
      image: '../../assets/images/image/add_member2.png',
      name: 'Shashank Rawal',
      lawyerTypeImg: '../../assets/images/icons/lawyer_type.svg',
      lawyerType: 'Divorce Lawyer',
      experienceImg: '../../assets/images/icons/member_experience.svg',
      experience: '10+ Experience',
      ratingStar: '../../assets/images/icons/yellow_star.svg',
      rating: '(4.5)',
    },
    {
      image: '../../assets/images/image/add_member.png',
      name: 'kapil Sibal',
      lawyerTypeImg: '../../assets/images/icons/lawyer_type.svg',
      lawyerType: 'Criminal Lawyer',
      experienceImg: '../../assets/images/icons/member_experience.svg',
      experience: '10+ Experience',
      ratingStar: '../../assets/images/icons/yellow_star.svg',
      rating: '(4.8)',
    },
    {
      image: '../../assets/images/image/add_member.png',
      name: 'kapil Sibal',
      lawyerTypeImg: '../../assets/images/icons/lawyer_type.svg',
      lawyerType: 'Criminal Lawyer',
      experienceImg: '../../assets/images/icons/member_experience.svg',
      experience: '10+ Experience',
      ratingStar: '../../assets/images/icons/yellow_star.svg',
      rating: '(4.8)',
    },
    {
      image: '../../assets/images/image/add_member.png',
      name: 'kapil Sibal',
      lawyerTypeImg: '../../assets/images/icons/lawyer_type.svg',
      lawyerType: 'Criminal Lawyer',
      experienceImg: '../../assets/images/icons/member_experience.svg',
      experience: '10+ Experience',
      ratingStar: '../../assets/images/icons/yellow_star.svg',
      rating: '(4.8)',
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

  constructor() { }

  ngAfterViewInit() {
    let element = document.getElementById('modalButton1') as HTMLElement;
    element.click();
  }
}
