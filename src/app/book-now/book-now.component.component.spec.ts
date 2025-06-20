import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookNowComponentComponent } from './book-now.component';

describe('BookNowComponentComponent', () => {
  let component: BookNowComponentComponent;
  let fixture: ComponentFixture<BookNowComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookNowComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookNowComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
