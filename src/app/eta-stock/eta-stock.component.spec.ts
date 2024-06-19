import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtaStockComponent } from './eta-stock.component';

describe('EtaStockComponent', () => {
  let component: EtaStockComponent;
  let fixture: ComponentFixture<EtaStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtaStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtaStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
