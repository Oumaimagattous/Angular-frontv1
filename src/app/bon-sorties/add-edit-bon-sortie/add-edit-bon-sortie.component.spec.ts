import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBonSortieComponent } from './add-edit-bon-sortie.component';

describe('AddEditBonSortieComponent', () => {
  let component: AddEditBonSortieComponent;
  let fixture: ComponentFixture<AddEditBonSortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditBonSortieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditBonSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
