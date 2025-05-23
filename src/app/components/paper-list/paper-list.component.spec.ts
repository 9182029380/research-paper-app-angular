import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperListComponent } from './paper-list.component';

describe('PaperListComponent', () => {
  let component: PaperListComponent;
  let fixture: ComponentFixture<PaperListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaperListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaperListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
