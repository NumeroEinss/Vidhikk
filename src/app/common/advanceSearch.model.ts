import { FormControl, FormGroup } from "@angular/forms";

export class AdvanceSearchModel {
    text: string = "";
    judge: string = "";
    caseNo: string = "";
    dateRange: any = new FormGroup({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null),
    });
    advocate: string = "";
    respondent: string = "";
    decisionDate: string = "";
    actType: string = "";
    actTitle: string = "";
    court: string = "";
};