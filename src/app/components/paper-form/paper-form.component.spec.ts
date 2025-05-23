import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperFormComponent } from './paper-form.component';

describe('PaperFormComponent', () => {
  let component: PaperFormComponent;
  let fixture: ComponentFixture<PaperFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaperFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaperFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
