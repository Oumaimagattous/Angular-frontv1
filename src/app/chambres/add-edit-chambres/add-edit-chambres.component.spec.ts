import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditChambresComponent } from './add-edit-chambres.component';

describe('AddEditChambresComponent', () => {
  let component: AddEditChambresComponent;
  let fixture: ComponentFixture<AddEditChambresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditChambresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditChambresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
