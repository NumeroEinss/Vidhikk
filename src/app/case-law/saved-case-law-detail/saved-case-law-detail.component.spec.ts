import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedCaseLawDetailComponent } from './saved-case-law-detail.component';

describe('SavedCaseLawDetailComponent', () => {
  let component: SavedCaseLawDetailComponent;
  let fixture: ComponentFixture<SavedCaseLawDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavedCaseLawDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedCaseLawDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
