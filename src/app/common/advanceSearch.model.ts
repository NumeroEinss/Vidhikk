import { FormControl, FormGroup } from "@angular/forms";

export class AdvanceSearchModel {
    text: string = "";
    judge: string = "";
    caseNo: string = "";
    caseYear: string = "";
    advocate: string = "";
    respondent: string = "";
    decisionDate: Object = {};
    actType: string = "";
    actTitle: string = "";
    court: string = "";
};