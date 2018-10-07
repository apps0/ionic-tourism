import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatListsPage } from './chat-lists.page';

describe('ChatListsPage', () => {
  let component: ChatListsPage;
  let fixture: ComponentFixture<ChatListsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatListsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatListsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
