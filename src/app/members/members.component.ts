import { Component, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss'
})
export class MembersComponent implements AfterViewInit{

  memberList = [
    {
      image:'../../assets/images/image/anurag_goyal.jpg',  
      memberName:"Apoorva Pandey",
      icon:'../../assets/images/icons/lock_member.svg',
      contactNo:"Profile Lock",
      emailIcon:'../../assets/images/icons/lock_member.svg',
      emailDetails:"Profile Lock",
      designation:"Corporate Lawyer",
      branch:"Pune"
    },
    {
      image:'../../../assets/images/image/anurag_goyal.jpg',  
      memberName:"Bhushan Singh",
      icon:'../../assets/images/icons/call_member.svg',
      contactNo:"+91-456-789-4560",
      emailIcon:'../../assets/images/icons/mail_member.svg',
      emailDetails:"bhushansingh1@gmail.com",
      designation:"Civil Lawyer",
      branch:"Goa"     
    },
    {
      image:'../../assets/images/image/anurag_goyal.jpg',  
      memberName:"Kunal Thakre",
      icon:'../../assets/images/icons/call_member.svg',
      contactNo:"+91-456-789-4560",
      emailIcon:'../../assets/images/icons/mail_member.svg',
      emailDetails:"kunalthakre1@gmail.com",
      designation:"Employement Lawyer",
      branch:"Mumbai"     
    },
    {
      image:'../../assets/images/image/anurag_goyal.jpg',  
      memberName:"Archana Upadhyaya",
      icon:'../../assets/images/icons/lock_member.svg',
      contactNo:"Profile Lock",
      emailIcon:'../../assets/images/icons/lock_member.svg',
      emailDetails:"Profile Lock",
      designation:"Criminal Lawyer",
      branch:"Pune"     
    },
    {
      image:'../../assets/images/image/anurag_goyal.jpg',  
      memberName:"Manika Da",
      icon:'../../assets/images/icons/lock_member.svg',
      contactNo:"Profile Lock",
      emailIcon:'../../assets/images/icons/mail_member.svg',
      emailDetails:"manikada32@gmail.com",
      designation:"Civil Lawyer",
      branch:"Pune"     
    },
    {
      image:'../../assets/images/image/anurag_goyal.jpg',  
      memberName:"Kunal Thakre",
      icon:'../../assets/images/icons/call_member.svg',
      contactNo:"+91-456-789-4560",
      emailIcon:'../../assets/images/icons/mail_member.svg',
      emailDetails:"kunalthakre1@gmail.com",
      designation:"Employement Lawyer",
      branch:"Mumbai"     
    },
    
  ];

  constructor() {}

  ngAfterViewInit() {
    let element = document.getElementById('modalButton') as HTMLElement;
    element.click();
  }
}
