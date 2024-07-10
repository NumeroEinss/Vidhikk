import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, ViewChild } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
  DateAdapter,
} from '@angular/material/core';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { ToastMessageService } from '../shared/services/snack-alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvailabilityModel, EventModel } from '../common/calendarModel';
import { ApolloService } from '../shared/services/apollo.service';
import { GQLConfig } from '../graphql.operations';
import { NgScrollbar } from 'ngx-scrollbar';

export const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
  ],
})
export class CalendarComponent {

  @ViewChild('calendarScroll') calendarScroll!: NgScrollbar;

  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  eventToBeDeleted: any;
  eventToBeEdited: any;

  deleteSlotIndex: number = 0;

  selectedTimes: any = { A: '', B: '' };

  events: CalendarEvent[] = [];

  eventTypeList = [
    { name: 'All Events', value: 'allEvent' },
    { name: 'Meetings', value: 'meetings' },
  ];

  repeatList = [
    { name: 'Once', value: 'once' },
    { name: 'Daily', value: 'daily' },
    { name: 'Mon to Friday', value: 'monToFriday' }
  ]

  reminderList = [
    { name: '1 hours before', value: '1hour' },
    { name: '2 hours before', value: '2hour' },
    { name: '3 hours before', value: '3hour' },
    { name: '4 hours before', value: '4hour' },
  ]

  eventType: string = 'allEvent';

  availabilityList: any = [];

  today: Date = new Date();

  repeat: any = "";

  reminder: any = "";

  caseList: any = [];

  displaySlot: any = [];

  slots: any = [
    { value: { timeSlot: '11am - 12pm', status: "available" }, viewValue: '11am - 12pm' },
    { value: { timeSlot: '12:30pm - 01:30pm', status: "available" }, viewValue: '12:30pm - 01:30pm' },
    { value: { timeSlot: '2pm - 3pm', status: "available" }, viewValue: '2pm - 3pm' },
    { value: { timeSlot: '5pm-6pm', status: "available" }, viewValue: '5pm-6pm' },
    { value: { timeSlot: '6pm-7pm', status: "available" }, viewValue: '6pm-7pm' },
    { value: { timeSlot: '7pm-8pm', status: "available" }, viewValue: '7pm-8pm' },
    { value: { timeSlot: '8pm-9pm', status: "available" }, viewValue: '8pm-9pm' },
  ];

  separatorKeysCodes: number[] = [ENTER, COMMA];

  minDate: Date = new Date();

  slotDate: any = { _d: new Date() };

  slot: any = [];

  slotId: string = "";

  deleteAvailabilitySlotId: string = "";

  eventForm!: FormGroup;

  editEventForm!: FormGroup;

  isEditMode: boolean = false;

  availabilityForm!: FormGroup;

  colors: string[] = ['#2E5BFF', '#00D34F', '#EF7E15', '#FFDE68', '#FF2E2E'];
  selectedColor: string = this.colors[0];

  constructor(private _toastMessage: ToastMessageService, private _fb: FormBuilder, private _apolloService: ApolloService) {
    this.getLawyerEvents();
    this.getCaseDiaryList();
    this.getAvailabilityList();
  }

  ngOnInit() {
    this.eventForm = this._fb.group(new EventModel());
    this.editEventForm = this._fb.group(new EventModel());
    this.availabilityForm = this._fb.group(new AvailabilityModel());
  }

  editEvent(event: CalendarEvent, selectedEvent: any) {
    let elemement = document.getElementById('addEventButton') as HTMLElement;
    elemement.click();
    this.eventForm.patchValue(selectedEvent);
  }

  handleDelete() {
    let deleteEventHandler = document.getElementById('deleteEventButton') as HTMLElement;
    deleteEventHandler.click();
  }

  deleteEvent() {
    this._apolloService.mutate(GQLConfig.deleteEvent, { eventId: this.eventToBeDeleted.eventId }).subscribe(objRes => {
      if (objRes.data != null) {
        if (objRes.data.deleteEvent.status == 200) {
          this._toastMessage.success(objRes.data.deleteEvent.message);
          this.getLawyerEvents();
        }
        else {
          this._toastMessage.error(objRes.data.deleteEvent.message);
        }
      }
    })
  }

  onTimeSet(e: any) {

  }

  addHours(date: Date, hours: number) {
    const hoursToAdd = hours * 60 * 60 * 1000;
    date.setTime(date.getTime() + hoursToAdd);
    return date;
  }

  addEvents() {
    let userData = localStorage.getItem('userData');
    let parsedData = userData ? JSON.parse(userData) : {};
    this.eventForm.controls.lawyerId.patchValue(parsedData._id);
    if (this.eventForm.valid) {
      this._apolloService.mutate(GQLConfig.addEvents, this.eventForm.value).subscribe(objRes => {
        if (objRes.data != null) {
          if (objRes.data.createEvents.status == 200) {
            this._toastMessage.success(objRes.data.createEvents.message);
            let closeEventButton = document.getElementById('closeEventModal') as HTMLElement;
            closeEventButton.click();
            this.getLawyerEvents();
          }
          else {
            this._toastMessage.error(objRes.data.createEvents.message);
          }
        }
      })
    }
    else {
      this._toastMessage.error("All Fields are Required !!");
    }
  }

  getCaseDiaryList() {
    let userData = localStorage.getItem('userData');
    let parsedData = userData ? JSON.parse(userData) : {};
    this._apolloService.mutate(GQLConfig.getCaseDiaryList, { lawyerId: parsedData._id }).subscribe((data) => {
      if (data.data != null) {
        if (data.data.getCaseDiaryList.status == 200) {
          this.caseList = data.data.getCaseDiaryList.data.caseDiaryList.result;
          this.caseList.unshift({ caseName: "Select", _id: "" });
        }
        else {
          this._toastMessage.error(data.data.getCaseDiaryList.message);
        }
      }
    });
  }

  getLawyerEvents() {
    let userData = localStorage.getItem('userData');
    let parsedData = userData ? JSON.parse(userData) : {};
    this._apolloService.mutate(GQLConfig.getLawyerEvents, { lawyerId: parsedData._id }).subscribe((data) => {
      if (data.data != null) {
        if (data.data.getLawyerEvent.status == 200) {
          let res = data.data.getLawyerEvent.data.resultList;
          res.map((event: any) => {
            event.title = event.eventName;
            event.start = new Date(event.eventStartDate);
            event.end = new Date(event.eventEndDate);
            event.color = {
              primary: event.color
            };
            event.meta = {
              description: event.eventDescription,
              repeat: event.repeat,
              reminder: event.reminder,
            };
            event.allDay = event.allDayCheck;
            event.actions = [
              {
                label: '<i class="fas fa-fw fa-pencil-alt"></i>Delete',
                onClick: (event: any): void => { this.handleDelete(), this.eventToBeDeleted = event.event },
              },
              {
                label: '<i class="fas fa-fw fa-trash-alt"></i>&nbsp;Edit',
                onClick: (event: any): void => { this.handleEdit(event.event), this.eventToBeEdited = event.event },
              }
            ];
          })
          this.events = res;
        }
        else {
          this._toastMessage.error(data.data.getLawyerEvent.message);
        }
      }
    });
  }

  handleEventClick(e: CalendarEvent) {
    console.log(e);
  }

  handleEdit(event: any) {
    console.log(event);
    this.editEventForm.patchValue(event);
    this.editEventForm.controls.color.patchValue(this.editEventForm.controls.color.value.primary);
    console.log(this.editEventForm.value);
    let editEventButton = document.getElementById('editEventButton') as HTMLElement;
    editEventButton.click();
  }

  updateEvent() {
    if (this.editEventForm.valid) {
      this._apolloService.mutate(GQLConfig.editEvents, this.editEventForm.value).subscribe(objRes => {
        if (objRes.data != null) {
          if (objRes.data.editEvent.status == 200) {
            this._toastMessage.success(objRes.data.editEvent.message);
            let closeEditEventButton = document.getElementById('closeEditEventModal') as HTMLElement;
            closeEditEventButton.click();
            this.getLawyerEvents();
          }
          else {
            this._toastMessage.error(objRes.data.editEvent.message);
          }
        }
      })
    }
    else {
      this._toastMessage.error("All Fields are Required !!");
    }
  }

  allDayEventChange() {
    if (this.eventForm.controls.allDayCheck.value == false) {
      this.eventForm.controls.eventStartTime.setValidators([Validators.required]);
      this.eventForm.controls.eventEndTime.setValidators([Validators.required]);
    }
    if (this.eventForm.controls.allDayCheck.value == true) {
      this.eventForm.controls.eventStartTime.removeValidators([Validators.required]);
      this.eventForm.controls.eventEndTime.removeValidators([Validators.required]);
    }
  }

  allDayEventEditChange() {
    if (this.editEventForm.controls.allDayCheck.value == false) {
      this.editEventForm.controls.eventStartTime.setValidators([Validators.required]);
      this.editEventForm.controls.eventEndTime.setValidators([Validators.required]);
    }
    if (this.editEventForm.controls.allDayCheck.value == true) {
      this.editEventForm.controls.eventStartTime.removeValidators([Validators.required]);
      this.editEventForm.controls.eventEndTime.removeValidators([Validators.required]);
    }
  }

  onColorChange(color: string) {
    this.selectedColor = color;
    console.log('Selected color:', this.selectedColor);
  }

  addAvaliability() {
    let userData = localStorage.getItem('userData');
    let parsedData = userData ? JSON.parse(userData) : {};
    this.availabilityForm.controls.lawyerId.patchValue(parsedData._id);
    if (this.availabilityForm.valid) {
      this._apolloService.mutate(GQLConfig.addAvailability, this.availabilityForm.value).subscribe(objRes => {
        if (objRes.data != null) {
          if (objRes.data.addAvailability.status == 200) {
            this._toastMessage.success(objRes.data.addAvailability.message);
            let closeEventButton = document.getElementById('closeAvailabilityButton') as HTMLElement;
            closeEventButton.click();
            this.getAvailabilityList();
            this.calendarScroll.scrollTo({ bottom: 0, end: 0 });
          }
          else {
            this._toastMessage.error(objRes.data.addAvailability.message);
          }
        }
      })
    }
    else {
      this._toastMessage.error("All Fields are Required !!");
    }
  }

  getAvailabilityList() {
    let userData = localStorage.getItem('userData');
    let parsedData = userData ? JSON.parse(userData) : {};
    this._apolloService.mutate(GQLConfig.getAvailabilityList, { lawyerId: parsedData._id }).subscribe((data) => {
      if (data.data != null) {
        if (data.data.getAvailabilityList.status == 200) {
          this.availabilityList = data.data.getAvailabilityList.data.availabilities;
        }
        else {
          this._toastMessage.error(data.data.getAvailabilityList.message);
        }
      }
    });
  }

  editAvailability(slot: any) {
    this.isEditMode = true;
    // this.slot = [];
    // this.slot = slot.timeSlots;
    // this.slotDate = slot.date;
    // this.slotId = slot._id;
    this.availabilityForm.reset();
    this.availabilityForm.patchValue(new AvailabilityModel);
    console.log(slot,"editSlot")
    console.log(this.slots,"allSLot");
    this.availabilityForm.patchValue(slot);
    let element = document.getElementById('addAvailabilityButton') as HTMLElement;
    element.click();
  }

  updateAvailability() {
    // let data = {
    //   avability_id: this.availabilityForm.controls._id.value,
    //   date: this.availabilityForm.controls.date.value,
    //   timeSlots: this.availabilityForm.controls.timeSlots.value
    // }
    this._apolloService.mutate(GQLConfig.editAvailability, this.availabilityForm.value).subscribe((data) => {
      if (data.data != null) {
        if (data.data.editAvailability.status == 200) {
          this._toastMessage.success(data.data.editAvailability.message);
          this.getAvailabilityList();
        }
        else {
          this._toastMessage.error(data.data.editAvailability.message);
        }
      }
    });
  }

  handleDeleteAvailability(slot: any) {
    this.deleteAvailabilitySlotId = slot._id
    let deleteAvailabilityHandler = document.getElementById('deleteAvailabilityButton') as HTMLElement;
    deleteAvailabilityHandler.click();
  }

  deleteAvailability() {
    this._apolloService.mutate(GQLConfig.deleteAvailability, { id: this.deleteAvailabilitySlotId }).subscribe((data) => {
      if (data.data != null) {
        if (data.data.deleteAvailability.status == 200) {
          this._toastMessage.success(data.data.deleteAvailability.message);
          this.getAvailabilityList();
        }
        else {
          this._toastMessage.error(data.data.deleteAvailability.message);
        }
      }
    });
  }
}
