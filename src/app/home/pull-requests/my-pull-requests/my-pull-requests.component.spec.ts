import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPullRequestsComponent } from './my-pull-requests.component';

describe('MyPullRequestsComponent', () => {
  let component: MyPullRequestsComponent;
  let fixture: ComponentFixture<MyPullRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPullRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPullRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
