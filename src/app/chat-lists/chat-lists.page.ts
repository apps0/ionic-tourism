import { Component, OnInit } from "@angular/core";
import { ChatService } from "../chat/chat.service";
import { UserService } from "../shared/services/user.service";
import { catchError } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { Location } from "@angular/common";

@Component({
  selector: "app-chat-lists",
  templateUrl: "./chat-lists.page.html",
  styleUrls: ["./chat-lists.page.scss"]
})
export class ChatListsPage implements OnInit {
  data$: BehaviorSubject<any> = new BehaviorSubject({ loading: true });

  fromUser = this.authService.userSubject.value;
  constructor(
    public chatService: ChatService,
    public authService: UserService,
    private _location: Location
  ) {}

  onBack() {
    this._location.back();
  }

  ngOnInit() {
    this.chatService
      .getUserChatList(this.fromUser.Id)
      .pipe(
        catchError(err => {
          this.data$.next({ error: true });
          return err;
        })
      )
      .subscribe(res => {
        if (res && res.length > 0) this.data$.next({ data: res });
        else this.data$.next({ empty: true });
      });
  }
  user(chat) {
    if (chat.User1.Id !== this.fromUser.Id) {
      return chat.User1;
    } else if (chat.User2.Id !== this.fromUser.Id) {
      return chat.User2;
    } else return null;
  }
}
