/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TradelistComponent } from './tradelist.component';

describe('TradelistComponent', () => {
  let component: TradelistComponent;
  let fixture: ComponentFixture<TradelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
