import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListeclientPage } from './listeclient.page';

describe('ListeclientPage', () => {
  let component: ListeclientPage;
  let fixture: ComponentFixture<ListeclientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeclientPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListeclientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
