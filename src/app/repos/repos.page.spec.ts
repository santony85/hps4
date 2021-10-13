import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReposPage } from './repos.page';

describe('ReposPage', () => {
  let component: ReposPage;
  let fixture: ComponentFixture<ReposPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReposPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReposPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
