import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcyTradeComponent } from './ccy-trade.component';

describe('CcyTradeComponent', () => {
  let component: CcyTradeComponent;
  let fixture: ComponentFixture<CcyTradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcyTradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcyTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
