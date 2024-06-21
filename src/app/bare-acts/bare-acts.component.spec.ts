import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BareActsComponent } from './bare-acts.component';

describe('BareActsComponent', () => {
  let component: BareActsComponent;
  let fixture: ComponentFixture<BareActsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BareActsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BareActsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
