import { Location } from '@angular/common';
import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { ToastMessageService } from '../../shared/services/snack-alert.service';
import { Router } from '@angular/router';
import { ApolloService } from '../../shared/services/apollo.service';
import { GQLConfig } from '../../graphql.operations';
import { HighlighterPipe } from '../../shared/pipe/highlighter.pipe';
import { MatMenuTrigger } from '@angular/material/menu';
import { EmailService } from '../../shared/services/email.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-case-law-detail',
  templateUrl: './case-law-detail.component.html',
  styleUrl: './case-law-detail.component.scss'
})

export class CaseLawDetailComponent {
  @ViewChild('printableContent') printableContent!: ElementRef;
  @Input() searchStyle = { width: '0px', display: 'none' };
  @Input() searchIcon = { width: 'auto', display: 'block' };
  @ViewChild('emailMenuTrigger') emailMenuTrigger!: MatMenuTrigger;
  caseId: any;
  caseLawDetail: any = { title: "", document: "" };
  userName: any;
  keyWord: any = "";
  routerState: any;
  memberList: any = [];
  title: string = "";
  recieversEmail: string = "";
  mailToLink: string = "";
  isLimitReached: boolean = false;
  isHighlighted: boolean = false;

  constructor(private _location: Location, private _router: Router, private _highlighterPipe: HighlighterPipe,
    private _toastMessage: ToastMessageService, private _apolloService: ApolloService, private _emailService: EmailService,
    private _http: HttpClient) {
    this.routerState = this._router.getCurrentNavigation()?.extras.state;
    this.userName = JSON.parse(localStorage.getItem('userData')!);
    if (this.routerState != undefined) {
      this.caseId = this.routerState.caseId || "";
      this.keyWord = this.routerState.keyWord || "";
      this.getCaseLawDetail();
      this.getMembersList();
    }
    else {
      this._router.navigate(['lawyer/case-law/cases']);
    }
  }

  routeBack() {
    this._location.back();
  }

  validateEmail(email: any) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  }

  sendEmail() {
    // if (this.validateEmail(this.recieversEmail)) {
    //   const emailAddress = this.recieversEmail;
    //   const subject = this.caseLawDetail.title;
    //   // const divId = 'section-to-print';
    //   const divId = 'judgement';
    //   const divContent = document.getElementById(divId) as HTMLElement;
    //   let doc = divContent.innerHTML
    //     .replace(/<br\s*\/?>/gi, '%0D%0A')            // Replace <br> with URL-encoded newlines
    //     .replace(/<\/(p|div|h[1-6]|li)>/gi, '%0D%0A')  // Replace closing block-level tags with newlines
    //     .replace(/<[^>]*>/g, '')                      // Strip remaining HTML tags
    //     .trim();                                      // Trim leading/trailing whitespace
    //   const bodyContent = `${this.getSharingContent(doc)}....%0D%0A%0D%0AThis is a Sample of one of the case laws, visit Vidhik at (http://84.247.151.137/auth/login) for accessing full case laws.`
    //   const mailToLink = `mailto:${emailAddress}?subject=${subject}&body=${bodyContent}`;

    //   // Open the mail client
    //   setTimeout(() => {
    //     window.open(mailToLink);
    //   }, 0);

    //   this.emailMenuTrigger.closeMenu();
    // }
    // else {
    //   this._toastMessage.error("Enter a valid email !!");
    // }
  }

  print() {
    const content = this.printableContent.nativeElement.innerHTML;
    const printWindow = window.open('case-law/print', '_blank');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(`
          <html>
            <head>
              <title>${this.getPrintTitle(this.caseLawDetail.title)}</title>
              <!-- Load Poppins font -->
              <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" rel="stylesheet">
              <style>
              @media print {
                html, body {
                  font-family: 'Poppins', sans-serif !important;
                }
                .logo {
                  width: 100%;
                  height: 65px;
                  text-align: center;
                  background-image: url("../../../../assets/images/icons/vidhiklogo.svg");
                  background-repeat: no-repeat;
                  background-position: center;
                }
                .header {
                  font-size: 16px;
                  font-weight: normal;
                  color: #8798ad;
                  text-align: center;
                }
                .highlighted-text {
                  font-size: 18px;
                  font-weight: 500;
                  color: #2E5BFF;
                  width: 100%;
                  margin-top: 38px;
                }
                .title {
                  font-size: 18px;
                  font-weight: bold;
                  color: black;
                  width: 100%;
                }
                .description {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  font-weight: normal;
                  line-height: 1.4;
                  margin-top: 30px;
                  font-size: 16px;
                }
                .desc-head {
                  max-width: 590px; 
                  text-align: center;
                  color: #282828;
                }
                .hearing-loc {
                  font-size: 18px;
                }
                .desc-body {
                  text-align: left;
                  color: #282828;
                  margin-top: 25px;
                  font-size: 18px;
                }
                .bold {
                  font-weight: bold;
                }
              }
              </style>
             </head>
             <body>
              ${content}
             </body>
          </html>
        `);
      printWindow.document.close();
      printWindow.print();
    } else {
      console.error('Failed to open print window.');
    }

  }

  getCaseLawDetail() {
    let userData = JSON.parse(localStorage.getItem('userData')!);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
      user: JSON.stringify(userData._id)
    })
    this._http.get(this._apolloService.BaseUrl + `/judgement/details/${this.caseId}`, { headers }).subscribe((data: any) => {
      if (data.status == "success") {
        this.caseLawDetail = data.data;
      }
      if (data.status == "error" && data.error === "Your daily quota has reached.") {
        this.isLimitReached = true;
      }
    })
  }

  removeDocidAndLicense(input: string): string {
    // Define the regex pattern
    const combinedPattern = /<u> Docid # IndLawLib\/\d+<\/u>|<p style="text-align:center;margin-top:20px;margin-bottom:5px;font-size:120%;color:red;">.*?<\/p>/g;
    // Replace the matched pattern with an empty string
    return input.replace(combinedPattern, '');
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

  share(member: any) { console.log('Share Member Triggered !!'); }

  getPrintTitle(title: any) {
    return title.replaceAll(' ', '_');
  }

  highlightText() {
    let selection: any = window.getSelection()?.toString();
    if (selection) {
      let doc = document.getElementById('judgement') as HTMLElement;
      doc.innerHTML = this._highlighterPipe.transformOne(doc.innerHTML, selection);
      this.isHighlighted = true;
    }
  }

  getUrl() {
    return window.location.host;
  }

  getSharingContent(str: string) {
    return str.slice(0, 4000);
  }

  sendmail() {
    // if (this.validateEmail(this.recieversEmail)) {
    //   const emailParams = {
    //     reply_to: this.userName.email,
    //     from_name: this.userName.name,
    //     message: this.caseLawDetail.document.replace(/<br\s*\/?>/gi, '%0D%0A')            // Replace <br> with URL-encoded newlines
    //       .replace(/<\/(p|div|h[1-6]|li)>/gi, '%0D%0A')  // Replace closing block-level tags with newlines
    //       .replace(/<[^>]*>/g, '')                      // Strip remaining HTML tags
    //       .trim(),
    //     mail_to: this.recieversEmail
    //   };
    //   const sizeInBytes = new Blob([JSON.stringify(emailParams)]).size;
    //   console.log('Approximate size of templateParams in bytes:', sizeInBytes);

    //   this._emailService.sendEmail(emailParams)
    // }
    // else {
    //   this._toastMessage.error("Enter a valid email !!");
    // }
  }

  saveCaseLaw() {
    if (this.isHighlighted) {
      let userData = JSON.parse(localStorage.getItem('userData')!);
      let data = {
        judgementId: this.caseId,
        judgement: this.caseLawDetail.document
      };
      this._apolloService.post(`/saved-judgement/${userData._id}`, data).subscribe(data => {
        if (data.status == "success") {
          this._toastMessage.success("Case Saved Successfully !!")
          this.routeBack();
        }
      });
    }
    else {
      this._toastMessage.error('Please Highlight any text to save !!');
    }
  }
}

