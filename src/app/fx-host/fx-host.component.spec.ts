import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FxHostComponent } from './fx-host.component';

describe('FxHostComponent', () => {
  let component: FxHostComponent;
  let fixture: ComponentFixture<FxHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FxHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FxHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
