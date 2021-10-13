import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeconnectPage } from './deconnect.page';

describe('DeconnectPage', () => {
  let component: DeconnectPage;
  let fixture: ComponentFixture<DeconnectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeconnectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeconnectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
