import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrayertimeComponent } from './prayertime.component';

describe('PrayertimeComponent', () => {
  let component: PrayertimeComponent;
  let fixture: ComponentFixture<PrayertimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrayertimeComponent]
    });
    fixture = TestBed.createComponent(PrayertimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
