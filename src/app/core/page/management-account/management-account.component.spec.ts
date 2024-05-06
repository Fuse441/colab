import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementAccountComponent } from './management-account.component';

describe('ManagementAccountComponent', () => {
  let component: ManagementAccountComponent;
  let fixture: ComponentFixture<ManagementAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagementAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
