import { Injectable } from "@angular/core";
import { FirestoreService } from "../shared/services/firestore.service";
import { Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { switchMap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  collectionName: string = "tourismChats";
  subCollectionName: string = "Messages";
  constructor(
    private firestoreService: FirestoreService,
    private afs: AngularFirestore
  ) {}

  public createRoom(chatUser: any, roomId: any) {
    const self = this;
    if (chatUser.User1.Id !== chatUser.User2.Id) {
      return self.firestoreService.upsert(
        `${self.collectionName}/${roomId}`,
        chatUser
      );
    }
  }
  public send(roomId: string, message: any) {
    return this.firestoreService.add(
      `${this.collectionName}/${roomId}/Messages`,
      message
    );
  }

  getUserMessages(roomId: string): Observable<any> {
    return this.firestoreService.colWithIds$(
      `${this.collectionName}/${roomId}/${this.subCollectionName}`,
      ref => {
        return ref.limit(30).orderBy("CreatedAt", "desc");
      }
    );
  }

  getUserChatList(userId: string): Observable<any> {
    return this.firestoreService
      .colWithIds$(this.collectionName, q => {
        return q.where("User1.Id", "==", userId).limit(30);
      })
      .pipe(
        switchMap(list => {
          return this.firestoreService
            .colWithIds$(this.collectionName, q => {
              return q.where("User2.Id", "==", userId).limit(30);
            })
            .pipe(
              map(res => {
                return [...list, ...res];
              })
            );
        })
      );
  }

  createPairId(item1: any, item2: any) {
    let pairId;
    if (item1.CreatedAt.seconds < item2.CreatedAt.seconds) {
      pairId = `${item1.Id}|${item2.Id}`;
    } else {
      pairId = `${item2.Id}|${item1.Id}`;
    }
    return pairId;
  }
}
