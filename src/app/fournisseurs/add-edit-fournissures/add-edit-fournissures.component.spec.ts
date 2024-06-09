import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFournissuresComponent } from './add-edit-fournissures.component';

describe('AddEditFournissuresComponent', () => {
  let component: AddEditFournissuresComponent;
  let fixture: ComponentFixture<AddEditFournissuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditFournissuresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditFournissuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
