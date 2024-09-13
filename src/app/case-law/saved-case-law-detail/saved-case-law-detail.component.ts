import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GQLConfig } from '../../graphql.operations';
import { HighlighterPipe } from '../../shared/pipe/highlighter.pipe';
import { ApolloService } from '../../shared/services/apollo.service';
import { EmailService } from '../../shared/services/email.service';
import { ToastMessageService } from '../../shared/services/snack-alert.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-saved-case-law-detail',
  templateUrl: './saved-case-law-detail.component.html',
  styleUrl: './saved-case-law-detail.component.scss'
})
export class SavedCaseLawDetailComponent {
  @ViewChild('printableContent') printableContent!: ElementRef;
  @Input() searchStyle = { width: '0px', display: 'none' };
  @Input() searchIcon = { width: 'auto', display: 'block' };
  savedCaseId: any;
  caseId: any
  savedCaseLaw: any = { title: "", document: "" };
  caseLawDetail: any = { title: "", document: "" };
  userName: any;
  routerState: any;
  isLimitReached: boolean = false;

  constructor(private _location: Location, private _router: Router, private _highlighterPipe: HighlighterPipe,
    private _toastMessage: ToastMessageService, private _apolloService: ApolloService, private _emailService: EmailService,
    private _http: HttpClient) {
    this.routerState = this._router.getCurrentNavigation()?.extras.state;
    this.userName = JSON.parse(localStorage.getItem('userData')!);
    if (this.routerState != undefined) {
      this.savedCaseId = this.routerState.savedCaseId || "";
      this.caseId = this.routerState.caseId || "";
      this.getCaseLawDetail();
      this.getSavedCaseLaw();
    }
    else {
      this._router.navigate(['lawyer/case-law/cases']);
    }
  }

  routeBack() {
    this._location.back();
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

  getSavedCaseLaw() {
    this._apolloService.get(`/saved-judgement/judgement/${this.savedCaseId}`).subscribe(data => {
      if (data.status == "success") {
        this.savedCaseLaw = data.data;
        this.highlightText();
      }
      if (data.status == "error") {
        this._toastMessage.error(data.error);
      }
    })
  }

  removeDocidAndLicense(input: string): string {
    // Define the regex pattern
    const combinedPattern = /<u> Docid # IndLawLib\/\d+<\/u>|<p style="text-align:center;margin-top:20px;margin-bottom:5px;font-size:120%;color:red;">.*?<\/p>/g;
    // Replace the matched pattern with an empty string
    return input.replace(combinedPattern, '');
  }

  getUrl() {
    return window.location.host;
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

  getPrintTitle(title: any) {
    return title.replaceAll(' ', '_');
  }

  highlightText() {
    let doc = document.getElementById('judgement') as HTMLElement;
    doc.innerHTML = this._highlighterPipe.transformOne(doc.innerHTML, this.savedCaseLaw.judgement);
  }
}
