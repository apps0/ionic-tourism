import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { User, UserRole } from "../models";
import { Observable, of } from "rxjs";
import { take, tap, map, share, distinctUntilChanged } from "rxjs/operators";
import { FirestoreService } from "./firestore.service";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root"
})
export class UserService {
  userCollectionName: string = "tourismUsers";

  userSubject: BehaviorSubject<User> = new BehaviorSubject(null);

  currentUser$: Observable<User> = this.userSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  isLoggedIn$: Observable<boolean> = this.userSubject
    .asObservable()
    .pipe(map(x => !!x));

  isAdmin$: Observable<boolean> = this.currentUser$.pipe(
    map(x => {
      return x ? x.Role == UserRole.Admin : false;
    })
  );

  isTourist$: Observable<boolean> = this.userSubject.asObservable().pipe(
    map(x => {
      return x ? x.Role == UserRole.Tourist : false;
    })
  );

  isCompanion$: Observable<boolean> = this.userSubject
    .asObservable()
    .pipe(map(x => (x ? x.Role == UserRole.Companion : false)));

  isVehicleProvider$: Observable<
    boolean
  > = this.userSubject
    .asObservable()
    .pipe(map(x => (x ? x.Role == UserRole.VehicleProvider : false)));

  isFnaProvider$: Observable<boolean> = this.userSubject
    .asObservable()
    .pipe(map(x => (x ? x.Role == UserRole.FoodProvider : false)));

  userCollection: AngularFirestoreCollection<User>;
  userList: Observable<User[]>;
  companionList: Observable<User[]>;
  vehicleProviderList: Observable<User[]>;
  fnaProviderList: Observable<User[]>;
  constructor(
    private router: Router,
    private firestoreService: FirestoreService
  ) {
    const user = window.localStorage["user"];
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  register(user: User) {
    return this.firestoreService.add(this.userCollectionName, user);
  }
  login(user: User): Observable<User> {
    return this.firestoreService
      .colWithIds$<User>(this.userCollectionName, ref => {
        return ref
          .where("PhoneNumber", "==", user.PhoneNumber)
          .where("Password", "==", user.Password)
          .limit(1);
      })
      .pipe(
        take(1),
        map(res => {
          return res.length > 0 ? res[0] : null;
        }),
        tap(x => {
          if (x !== null) {
            window.localStorage["user"] = JSON.stringify(x);
            this.userSubject.next(x);
          }
        })
      );
  }

  getCompanions(): Observable<any> {
    return this.firestoreService.colWithIds$<User>(
      this.userCollectionName,
      ref => {
        return ref.where("Role", "==", UserRole.Companion).limit(20);
      }
    );
  }
  getByRole(role: UserRole): Observable<any> {
    return this.firestoreService.colWithIds$<User>(
      this.userCollectionName,
      ref => {
        return ref.where("Role", "==", role).limit(20);
      }
    );
  }
  getFnaList(): Observable<any> {
    return this.firestoreService.colWithIds$<User>(
      this.userCollectionName,
      ref => {
        return ref.where("Role", "==", UserRole.FoodProvider).limit(20);
      }
    );
  }
  logOut() {
    return of(true)
    .pipe(
      tap(() => {
        window.localStorage.removeItem("user");
        this.userSubject.next(null);
      })
    );
  }

  getById(productId: string): any {
    return this.firestoreService.docWithId$(
      `${this.userCollectionName}/${productId}`
    );
  }
  updateDoc(updatedUser,docId): any {
    this.firestoreService.update(
      `${this.userCollectionName}/${docId}`,
      updatedUser
    );
  }
}
