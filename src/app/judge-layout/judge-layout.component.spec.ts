import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeLayoutComponent } from './judge-layout.component';

describe('JudgeLayoutComponent', () => {
  let component: JudgeLayoutComponent;
  let fixture: ComponentFixture<JudgeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JudgeLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JudgeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
