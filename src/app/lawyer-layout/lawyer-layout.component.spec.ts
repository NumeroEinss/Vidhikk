import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerLayoutComponent } from './lawyer-layout.component';

describe('LayoutComponent', () => {
  let component: LawyerLayoutComponent;
  let fixture: ComponentFixture<LawyerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LawyerLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LawyerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
