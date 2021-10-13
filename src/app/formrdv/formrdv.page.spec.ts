import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormrdvPage } from './formrdv.page';

describe('FormrdvPage', () => {
  let component: FormrdvPage;
  let fixture: ComponentFixture<FormrdvPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormrdvPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormrdvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
