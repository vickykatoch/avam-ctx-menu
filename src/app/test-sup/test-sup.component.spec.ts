import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSupComponent } from './test-sup.component';

describe('TestSupComponent', () => {
  let component: TestSupComponent;
  let fixture: ComponentFixture<TestSupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
