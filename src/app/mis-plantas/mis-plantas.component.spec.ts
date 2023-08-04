import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisPlantasComponent } from './mis-plantas.component';

describe('MisPlantasComponent', () => {
  let component: MisPlantasComponent;
  let fixture: ComponentFixture<MisPlantasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisPlantasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisPlantasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
