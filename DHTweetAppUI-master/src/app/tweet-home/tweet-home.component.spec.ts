import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetHomeComponent } from './tweet-home.component';

describe('TweetHomeComponent', () => {
  let component: TweetHomeComponent;
  let fixture: ComponentFixture<TweetHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
