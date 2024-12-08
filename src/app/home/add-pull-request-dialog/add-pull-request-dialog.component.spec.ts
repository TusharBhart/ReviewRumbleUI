import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPullRequestDialogComponent } from './add-pull-request-dialog.component';

describe('AddPullRequestDialogComponent', () => {
  let component: AddPullRequestDialogComponent;
  let fixture: ComponentFixture<AddPullRequestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPullRequestDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPullRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
