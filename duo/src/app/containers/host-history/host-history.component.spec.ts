import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostHistoryComponent } from './host-history.component';

describe('HostHistoryComponent', () => {
  let component: HostHistoryComponent;
  let fixture: ComponentFixture<HostHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
