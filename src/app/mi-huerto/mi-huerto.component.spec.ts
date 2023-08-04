import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiHuertoComponent } from './mi-huerto.component';

describe('MiHuertoComponent', () => {
  let component: MiHuertoComponent;
  let fixture: ComponentFixture<MiHuertoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiHuertoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiHuertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
