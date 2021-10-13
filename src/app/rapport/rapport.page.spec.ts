import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RapportPage } from './rapport.page';

describe('RapportPage', () => {
  let component: RapportPage;
  let fixture: ComponentFixture<RapportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RapportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
