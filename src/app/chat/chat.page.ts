import {
  Component,
  OnInit,
  ContentChild,
  ElementRef,
  ChangeDetectionStrategy
} from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { UserService } from "../shared/services/user.service";
import { ActivatedRoute } from "@angular/router";
import { ChatService } from "./chat.service";
import {
  LoadingController,
  ToastController,
  ModalController
} from "@ionic/angular";
import { switchMap, catchError } from "rxjs/operators";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.page.html",
  styleUrls: ["./chat.page.scss"]
})
export class ChatPage implements OnInit {
  data$: BehaviorSubject<any> = new BehaviorSubject({ loading: true });
  @ContentChild("content")
  content: ElementRef;
  toUser = null;
  roomId = null;
  message: string = null;
  constructor(
    public authService: UserService,
    private route: ActivatedRoute,
    private chatService: ChatService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public modalController: ModalController
  ) {}
  ngOnInit() {
    this.setup();
  }
  setup() {
    if (this.toUser) {
      const fromUser = this.authService.userSubject.value;
      this.roomId = this.chatService.createPairId(
        this.toUser,
        this.authService.userSubject.value
      );
      const chatUser = {
        User1: {
          Id: fromUser.Id,
          FullName: fromUser.FullName
        },
        User2: {
          Id: this.toUser.Id,
          FullName: this.toUser.FullName
        }
      };
      if (chatUser.User1.Id !== chatUser.User2.Id) {
        this.chatService
          .createRoom(chatUser, this.roomId)
          .then(() => {
            this.chatService
              .getUserMessages(this.roomId)
              .pipe(
                catchError(err => {
                  this.data$.next({ error: true });
                  return err;
                })
              )
              .subscribe(res => {
                console.log(res);
                if (res && res.length > 0) this.data$.next({ data: res });
                else this.data$.next({ empty: true });
              });
          })
          .catch(err => {
            this.data$.next({ error: true });
          });
      }
    } else {
      throw new Error("To User is not found");
    }
  }
  send() {
    if (this.message && this.message.trim().length > 0) {
      const chat = {
        To: this.toUser,
        From: this.authService.userSubject.value,
        MessageText: this.message
      };
      this.chatService.send(this.roomId, chat).then(() => {
        this.message = null;
      });
    }
  }

  onCancel() {
    this.modalController.dismiss();
  }

  chatUserTitle(chat) {
    if (chat.From && chat.From.Id === this.authService.userSubject.value.Id) {
      return "You";
    } else if (chat.From) {
      return chat.From.FullName;
    } else {
      return null;
    }
  }

  isMine(chat) {
    return chat.From
      ? chat.From.Id === this.authService.userSubject.value.Id
      : false;
  }
}
