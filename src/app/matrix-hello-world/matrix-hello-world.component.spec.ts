import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixHelloWorldComponent } from './matrix-hello-world.component';

describe('MatrixHelloWorldComponent', () => {
  let component: MatrixHelloWorldComponent;
  let fixture: ComponentFixture<MatrixHelloWorldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatrixHelloWorldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatrixHelloWorldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
