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
  isHighlighted: boolean = false;

  constructor(private _location: Location, private _router: Router, private _highlighterPipe: HighlighterPipe,
    private _toastMessage: ToastMessageService, private _apolloService: ApolloService, private _emailService: EmailService,
    private _http: HttpClient, private elementRef: ElementRef) {
    this.routerState = this._router.getCurrentNavigation()?.extras.state;
    this.userName = JSON.parse(sessionStorage.getItem('userData')!);
    if (this.routerState != undefined) {
      this.savedCaseId = this.routerState.savedCaseId || "";
      this.caseId = this.routerState.caseId || "";
      this.getSavedCaseLaw();
    }
    else {
      this._router.navigate(['lawyer/case-law/cases']);
    }
  }

  routeBack() {
    this._location.back();
  }

  getSavedCaseLaw() {
    this._apolloService.get(`/saved-judgement/judgement/${this.savedCaseId}`).subscribe(data => {
      if (data.status == "success") {
        this.savedCaseLaw = data.data;
        this.showHighlightedText();
      }
      if (data.status == "error") {
        this._toastMessage.error(data.error);
      }
    })
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

  showHighlightedText() {
    let doc = document.getElementById('judgement') as HTMLElement;
    doc.innerHTML = this._highlighterPipe.transform(doc.innerHTML, this.savedCaseLaw.judgement);
  }

  highlightText() {
    let selection: any = window.getSelection()?.toString();
    if (selection) {
      let doc = document.getElementById('judgement') as HTMLElement;
      doc.innerHTML = this._highlighterPipe.transformOne(doc.innerHTML, selection);
      this.isHighlighted = true;
    }
  }

  async saveCaseLaw() {
    if (this.isHighlighted) {
      let userData = JSON.parse(sessionStorage.getItem('userData')!);
      let data = {
        judgementId: this.caseId,
        judgement: await this.fetchMarkedText()
      };
      console.log(data)
      this._apolloService.post(`/saved-judgement/${userData._id}`, data).subscribe(data => {
        if (data.status == "success") {
          this._toastMessage.success("Case Saved Successfully !!")
          this.isHighlighted = false;
          // this.routeBack();
        }
      });
    }

    else {
      this._toastMessage.error('Please Highlight any text to save !!');
    }
  }

  async fetchMarkedText(): Promise<string[]> {
    let markedArray: string[] = [];
    // Access the div container using ElementRef
    const contentContainer = this.elementRef.nativeElement.querySelector('#judgement');
    return contentContainer.outerHTML;
  }
}
