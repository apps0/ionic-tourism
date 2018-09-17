import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { FirestoreService } from "./firestore.service";
import { Place } from "../models/place";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class TripService {
  collectionName: string = "tourismTrips";
  constructor(private firestoreService: FirestoreService) {}

  register(data) {
    return this.firestoreService.add(this.collectionName, data);
  }

  getAll() {
    return this.firestoreService.colWithIds$(this.collectionName, q => {
      return q.limit(30).orderBy("createdAt", "desc");
    });
  }
  getAllUserTrips(userId):Observable<any> {
    return this.firestoreService.colWithIds$(this.collectionName, q => {
      return q.where("UserId","==",userId)
      .limit(30);
    });
  }
  get(id: string) {
    return this.firestoreService.docWithId$(this.collectionName + "/" + id);
  }
}
