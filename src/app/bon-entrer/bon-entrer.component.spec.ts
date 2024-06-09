import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonEntrerComponent } from './bon-entrer.component';

describe('BonEntrerComponent', () => {
  let component: BonEntrerComponent;
  let fixture: ComponentFixture<BonEntrerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonEntrerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonEntrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
