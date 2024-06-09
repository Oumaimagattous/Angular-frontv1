import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditClientsComponent } from './add-edit-clients.component';

describe('AddEditClientsComponent', () => {
  let component: AddEditClientsComponent;
  let fixture: ComponentFixture<AddEditClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditClientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
