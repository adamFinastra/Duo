import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostRequestsComponent } from './host-requests.component';

describe('HostRequestsComponent', () => {
  let component: HostRequestsComponent;
  let fixture: ComponentFixture<HostRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
