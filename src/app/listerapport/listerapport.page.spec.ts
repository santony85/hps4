import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListerapportPage } from './listerapport.page';

describe('ListerapportPage', () => {
  let component: ListerapportPage;
  let fixture: ComponentFixture<ListerapportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListerapportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListerapportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
