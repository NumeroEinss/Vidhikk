import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvocateSchedulingComponent } from './advocate-scheduling.component';

describe('AdvocateSchedulingComponent', () => {
  let component: AdvocateSchedulingComponent;
  let fixture: ComponentFixture<AdvocateSchedulingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvocateSchedulingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvocateSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
