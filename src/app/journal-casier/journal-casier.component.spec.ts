import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalCasierComponent } from './journal-casier.component';

describe('JournalCasierComponent', () => {
  let component: JournalCasierComponent;
  let fixture: ComponentFixture<JournalCasierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalCasierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalCasierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
