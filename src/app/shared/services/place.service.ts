import { Injectable } from "@angular/core";
import {
  AngularFirestore
} from "angularfire2/firestore";
import { FirestoreService } from "./firestore.service";
import { Place } from "../models/place";
import { Observable } from "rx";
@Injectable({
  providedIn: "root"
})
export class PlaceService {
  placeCollectionName:string="tourismPlaces";
  constructor(
    private firestoreService: FirestoreService
  ) {
  }

  register(place: Place) {
    return this.firestoreService.add(this.placeCollectionName,place);
  }
  search(value): any {
    return this.firestoreService.colWithIds$(this.placeCollectionName, q => {
      return q
        .orderBy("Name")
        .startAt(value.toLowerCase())
        .endAt(value.toLowerCase() + "\uf8ff")
        .limit(10);
    });
  }
  get():any {
    return this.firestoreService.colWithIds$(this.placeCollectionName,
      (q)=>{
        return q.limit(30).orderBy("CreatedAt",'desc')
      });
  }

  getById(id: string): any {
    return this.firestoreService.docWithId$(
      `${this.placeCollectionName}/${id}`
    );
  }
  updateDoc(updatedDoc,docId): any {
    this.firestoreService.update(
      `${this.placeCollectionName}/${docId}`,
      updatedDoc
    );
  }
}
