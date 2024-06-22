import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJournalCasierComponent } from './add-journal-casier.component';

describe('AddJournalCasierComponent', () => {
  let component: AddJournalCasierComponent;
  let fixture: ComponentFixture<AddJournalCasierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddJournalCasierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddJournalCasierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
