import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectRequestsComponent } from './connect-requests.component';

describe('ConnectRequestsComponent', () => {
  let component: ConnectRequestsComponent;
  let fixture: ComponentFixture<ConnectRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
