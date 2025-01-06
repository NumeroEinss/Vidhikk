import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvocateRatingComponent } from './advocate-rating.component';

describe('AdvocateRatingComponent', () => {
  let component: AdvocateRatingComponent;
  let fixture: ComponentFixture<AdvocateRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvocateRatingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvocateRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
