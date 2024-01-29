import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubDiaryComponent } from './create-sub-diary.component';

describe('CreateSubDiaryComponent', () => {
  let component: CreateSubDiaryComponent;
  let fixture: ComponentFixture<CreateSubDiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSubDiaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSubDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
