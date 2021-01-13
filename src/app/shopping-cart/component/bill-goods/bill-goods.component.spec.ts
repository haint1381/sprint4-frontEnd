import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillGoodsComponent } from './bill-goods.component';

describe('ListCartComponent', () => {
  let component: BillGoodsComponent;
  let fixture: ComponentFixture<BillGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
