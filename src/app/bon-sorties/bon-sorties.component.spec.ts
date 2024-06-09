import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonSortiesComponent } from './bon-sorties.component';

describe('BonSortiesComponent', () => {
  let component: BonSortiesComponent;
  let fixture: ComponentFixture<BonSortiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonSortiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonSortiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
