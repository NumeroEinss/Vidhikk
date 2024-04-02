import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvocateComponent } from './advocate.component';

describe('AdvocateComponent', () => {
  let component: AdvocateComponent;
  let fixture: ComponentFixture<AdvocateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvocateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
