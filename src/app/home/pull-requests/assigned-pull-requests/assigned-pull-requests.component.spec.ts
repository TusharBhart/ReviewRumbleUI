import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedPullRequestsComponent } from './assigned-pull-requests.component';

describe('AssignedPullRequestsComponent', () => {
  let component: AssignedPullRequestsComponent;
  let fixture: ComponentFixture<AssignedPullRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedPullRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedPullRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
