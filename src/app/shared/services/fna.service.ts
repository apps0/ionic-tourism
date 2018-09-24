import { Injectable } from "@angular/core";
import { FirestoreService } from "./firestore.service";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class FnaService {
  collectionName: string = "tourismFnaTypes";
  constructor(private firestoreService: FirestoreService) {}

  registerType(data) {
    return this.firestoreService.add(this.collectionName, data);
  }
  delete(docId: any) {
    return this.firestoreService.delete(this.collectionName + "/" + docId);
  }
  getTypes(): Observable<any> {
    return this.firestoreService.colWithIds$(this.collectionName, q => {
      return q.limit(30).orderBy("CreatedAt", "desc");
    });
  }
  getType(typeId): Observable<any> {
    return this.firestoreService
      .docWithId$(this.collectionName + "/" + typeId)
      .pipe(take(1));
  }
  getById(id: string): any {
    return this.firestoreService.docWithId$(`${this.collectionName}/${id}`);
  }
}
