import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGoodsComponent } from './list-goods.component';

describe('ListGoodsComponent', () => {
  let component: ListGoodsComponent;
  let fixture: ComponentFixture<ListGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
