import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/auth";
import firebase from "firebase/app";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class PostService {
  currentUser: firebase.User;


  constructor(private afs: AngularFirestore,
    private afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe(user => this.currentUser = user);
  }
  getAllPosts(): Observable<any> {
    return this.afs.collection<any>('posts', ref => ref.orderBy('time', 'desc')).
      snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(item => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data(),

            };
          });
        })
      );
  }
  postMessage(message: string, ownername: string, otheritem): void {
    this.afs.collection('posts').add({
      message,
      title: ownername,
      user_id: this.currentUser.uid,
      //time: firebase.firestore.FieldValue.serverTimestamp,
      ...otheritem
    }).then(res => console.log(res)).catch(error => console.log(error)
    );

  }
}