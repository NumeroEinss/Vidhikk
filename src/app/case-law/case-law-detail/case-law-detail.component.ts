import { Location } from '@angular/common';
import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { ToastMessageService } from '../../shared/services/snack-alert.service';
import { Router } from '@angular/router';
import { ApolloService } from '../../shared/services/apollo.service';
import { GQLConfig } from '../../graphql.operations';
import { HighlighterPipe } from '../../shared/pipe/highlighter.pipe';
import { MatMenuTrigger } from '@angular/material/menu';

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
  // vidhikLogoUrl = '../../../../assets/images/icons/vidhiklogo.svg';
  caseId: any;
  caseLawDetail: any = { title: "", document: "" };
  userName: any;
  keyWord: any = "";
  routerState: any;
  memberList: any = [];
  title: string = "";
  sendersEmail: string = "";
  mailToLink: string = "";

  constructor(private _location: Location, private _router: Router, private _highlighterPipe: HighlighterPipe,
    private _toastMessage: ToastMessageService, private _apolloService: ApolloService) {
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
    console.log(this.validateEmail(this.sendersEmail));
    if (this.validateEmail(this.sendersEmail)) {
      const emailAddress = this.userName.email;
      const cc = '';
      const bcc = '';
      const subject = this.caseLawDetail.title;
      let divId = 'section-to-print'
      const divContent = document.getElementById(divId) as HTMLElement;
      let doc = divContent.innerHTML.replace(/<[^>]*>/g, '');
      this.mailToLink = `mailto:${emailAddress}?cc=${cc}&bcc=${bcc}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(doc)}`;
      let mail = document.getElementById('mail') as HTMLElement;
      mail.click();
      this.emailMenuTrigger.closeMenu();
    }
    else {
      this._toastMessage.error("Enter a valid email !!");
    }
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
    this._apolloService.get(`/judgement/details/${this.caseId}`).subscribe(data => {
      if (data.status == "success") {
        this.caseLawDetail = data.data;
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
    console.log(window.getSelection(),'selectionpro')
    let selection: any = window.getSelection()?.toString();
    console.log(selection, 'selection');
    if (selection) {
      let doc = document.getElementById('judgement') as HTMLElement;
      doc.innerHTML = this._highlighterPipe.transformOne(doc.innerHTML, selection);
    }
  }
}

