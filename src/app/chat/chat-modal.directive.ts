import { Directive, Input, HostListener, ElementRef } from "@angular/core";
import { ModalController, LoadingController } from "@ionic/angular";
import { ChatPage } from "./chat.page";
import { UserService } from "../shared/services/user.service";
import { catchError, take } from "rxjs/operators";

@Directive({
  selector: "[chatModal]"
})
export class ChatModalDirective {
  @Input("chatModal")
  userId;

  constructor(
    private modalCtrl: ModalController,
    private auth: UserService,
    public loadingController: LoadingController,
    public authService: UserService,
    public elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    const fromUser = this.authService.userSubject.value;
    if (fromUser.Id == this.userId) {
      this.elementRef.nativeElement.style.display = "none";
    }
  }

  @HostListener("click")
  async onClick() {
    if (this.userId) {
      const loading = await this.loadingController.create({
        content: "Processing..."
      });
      loading.present();
      this.auth
        .getById(this.userId)
        .pipe(
          take(1),
          catchError(err => {
            loading.dismiss();
            return err;
          })
        )
        .subscribe(res => {
          loading.dismiss();
          this.openModal(res);
        });
    } else {
      throw new Error("User id is not found !");
    }
  }
  async openModal(user) {
    if (user && user.Id) {
      const modal = await this.modalCtrl.create({
        component: ChatPage,
        componentProps: {
          toUser: user
        }
      });
      return await modal.present();
    }
  }
}
