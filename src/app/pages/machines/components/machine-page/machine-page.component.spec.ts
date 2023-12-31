/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MachinePageComponent } from './machine-page.component';

describe('MachinePageComponent', () => {
  let component: MachinePageComponent;
  let fixture: ComponentFixture<MachinePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachinePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachinePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
