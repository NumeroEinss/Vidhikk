import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvocateListComponent } from './advocate-list.component';

describe('AdvocateListComponent', () => {
  let component: AdvocateListComponent;
  let fixture: ComponentFixture<AdvocateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvocateListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvocateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
