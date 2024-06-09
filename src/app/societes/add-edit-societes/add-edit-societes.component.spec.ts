import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSocietesComponent } from './add-edit-societes.component';

describe('AddEditSocietesComponent', () => {
  let component: AddEditSocietesComponent;
  let fixture: ComponentFixture<AddEditSocietesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSocietesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditSocietesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
