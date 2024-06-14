import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalStockComponent } from './journal-stock.component';

describe('JournalStockComponent', () => {
  let component: JournalStockComponent;
  let fixture: ComponentFixture<JournalStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
