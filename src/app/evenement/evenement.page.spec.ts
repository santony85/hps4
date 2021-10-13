import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EvenementPage } from './evenement.page';

describe('EvenementPage', () => {
  let component: EvenementPage;
  let fixture: ComponentFixture<EvenementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvenementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EvenementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
