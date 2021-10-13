import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalfichePage } from './modalfiche.page';

describe('ModalfichePage', () => {
  let component: ModalfichePage;
  let fixture: ComponentFixture<ModalfichePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalfichePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalfichePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
