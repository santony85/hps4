import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormrapportPage } from './formrapport.page';

describe('FormrapportPage', () => {
  let component: FormrapportPage;
  let fixture: ComponentFixture<FormrapportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormrapportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormrapportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
