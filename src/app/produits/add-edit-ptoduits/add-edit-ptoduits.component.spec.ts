import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPtoduitsComponent } from './add-edit-ptoduits.component';

describe('AddEditPtoduitsComponent', () => {
  let component: AddEditPtoduitsComponent;
  let fixture: ComponentFixture<AddEditPtoduitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPtoduitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPtoduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
