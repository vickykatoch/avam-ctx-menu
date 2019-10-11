import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcyCategoriesBarComponent } from './ccy-categories-bar.component';

describe('CcyBarComponent', () => {
  let component: CcyCategoriesBarComponent;
  let fixture: ComponentFixture<CcyCategoriesBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcyCategoriesBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcyCategoriesBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
