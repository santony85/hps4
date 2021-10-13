import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalproduitPage } from './modalproduit.page';

describe('ModalproduitPage', () => {
  let component: ModalproduitPage;
  let fixture: ComponentFixture<ModalproduitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalproduitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalproduitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
