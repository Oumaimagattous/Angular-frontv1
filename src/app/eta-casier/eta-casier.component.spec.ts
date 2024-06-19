import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtaCasierComponent } from './eta-casier.component';

describe('EtaCasierComponent', () => {
  let component: EtaCasierComponent;
  let fixture: ComponentFixture<EtaCasierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtaCasierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtaCasierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
