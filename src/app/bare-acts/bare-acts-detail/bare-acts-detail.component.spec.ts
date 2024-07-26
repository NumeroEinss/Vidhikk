import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BareActsDetailComponent } from './bare-acts-detail.component';

describe('BareActsDetailComponent', () => {
  let component: BareActsDetailComponent;
  let fixture: ComponentFixture<BareActsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BareActsDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BareActsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
