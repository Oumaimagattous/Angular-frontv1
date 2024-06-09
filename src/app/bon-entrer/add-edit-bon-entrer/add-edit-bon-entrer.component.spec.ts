import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBonEntrerComponent } from './add-edit-bon-entrer.component';

describe('AddEditBonEntrerComponent', () => {
  let component: AddEditBonEntrerComponent;
  let fixture: ComponentFixture<AddEditBonEntrerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditBonEntrerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditBonEntrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
