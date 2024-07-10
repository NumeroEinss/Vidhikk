export class EventModel {
    eventId: string = "";
    lawyerId: string = "";
    caseId: string = "";
    eventName: string = "";
    eventDescription: string = "";
    allDayCheck: boolean = false;
    color: string = "";
    eventStartDate: Date = new Date();
    eventEndDate: Date = new Date();
    eventStartTime: any = "";
    eventEndTime: any = "";
    repeat: string = "";
    reminder: string = "";
}

export class AvailabilityModel {
    _id: string = "";
    lawyerId: string = "";
    date: Date = new Date();
    timeSlots: Array<TimeSlot> = [];
}

export class TimeSlot {
    timeSlot: string = "";
    status: string = "available";
}