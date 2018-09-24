import { Injectable } from "@angular/core";
import { User } from "../models";
import { Observable } from "rxjs";
import { FirestoreService } from "./firestore.service";

@Injectable({
  providedIn: "root"
})
export class VehicleService {
  collectionName: string = "tourismVehicles";
  constructor(private firestoreService: FirestoreService) {}


  register(data: any) {
    return this.firestoreService.add(this.collectionName,data);
  }
  delete(docId: any) {
    return this.firestoreService.delete(this.collectionName+"/"+docId);
  }

  getVehiclesByProvider(id: string): Observable<any> {
    return this.firestoreService
      .colWithIds$<any>(this.collectionName, (ref) => {
        return ref
        .where("ProviderId", "==", id)
        .limit(30);
      });
  }

  getVehicles(): Observable<any> {
    return this.firestoreService
      .colWithIds$<any>(this.collectionName, (ref) => {
        return ref
        .orderBy("CreatedAt",'desc')
        .limit(30);
      });
  }

  getById(docId: string): any {
    return this.firestoreService.docWithId$(
      `${this.collectionName}/${docId}`
    );
  }
  updateDoc(updatedDoc,docId): any {
    this.firestoreService.update(
      `${this.collectionName}/${docId}`,
      updatedDoc
    );
  }
}
