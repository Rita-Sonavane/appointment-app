import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAppointmantComponent } from './book-appointmant.component';

describe('BookAppointmantComponent', () => {
  let component: BookAppointmantComponent;
  let fixture: ComponentFixture<BookAppointmantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookAppointmantComponent]
    });
    fixture = TestBed.createComponent(BookAppointmantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
