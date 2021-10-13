import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SchedulerPage } from './scheduler.page';
import { FullCalendarModule } from '@fullcalendar/angular';

describe('SchedulerPage', () => {
  let component: SchedulerPage;
  let fixture: ComponentFixture<SchedulerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulerPage ],
      imports: [IonicModule.forRoot(),
        FullCalendarModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SchedulerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
