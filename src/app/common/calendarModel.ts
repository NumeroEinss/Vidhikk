export class CalendarModel {
    case: string = "";
    event: string = "";
    eventDescription: string = "";
    allDay: boolean = false;
    color: string = "#2e5bff";
    startDate: Date = new Date();
    endDate: Date = new Date();
    startTime: any = "";
    endTime: any = "";
    repeat: string = "";
    reminder: string = "";
}