import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireModule } from '@angular/fire';
import { BehaviorSubject, Observable } from 'rxjs';
import firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
defaultAvatar: string = "https://portal.staralliance.com/cms/aux-pictures/prototype-images/avatar-default.png/@@images/image.png";
  private userData: Observable<firebase.User>;

  private currentUser: Userdata;
  private currentUser$ = new BehaviorSubject<Userdata>(null);





  constructor(private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router) {
    this.userData = afAuth.authState;
    this.userData.subscribe(user => {
      if (user) {
        this.afs.collection<Userdata>('users').doc<Userdata>(user.uid).valueChanges()
          .subscribe(currentUser => {
            this.currentUser = currentUser;
            this.currentUser$.next(this.currentUser);
          })
      }
    })
  }

  CurrentUser(): Observable<Userdata> {
return this.currentUser$.asObservable();
  }

  signUp(email: string,
  password: string,
  firstName: string,
  lastName: string,
  avatar ):void{
    this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(res =>{
      if(res){
if(avatar == undefined  || avatar == ""){
  avatar = this.defaultAvatar;
}

        this.afs.collection('users').doc(res.user.uid)
        .set({
          firstName,
          lastName,
          email,
          avatar
        }).then(()=>{
          this.afs.collection<Userdata>('users').doc<Userdata>(res.user.uid).valueChanges()
          .subscribe(user =>{
            if(user){
              this.currentUser = this.currentUser;
              this.currentUser$.next(this.currentUser)
            }
          })
        })
      }
    }).catch(err => console.log(err));
    

  }
  get UserData(): Observable<firebase.User>{
    return this.userData;
  }

  signIn(email: string, password: string): void{
    this.afAuth.signInWithEmailAndPassword(email, password)
    .then(res => {
      this.userData = this.afAuth.authState;
      this.afs.collection<Userdata>('users').doc(res.user.uid).valueChanges()
      .subscribe(user =>{
        if(user){
          this.currentUser$.next(this.currentUser);
        }
      })
    }).catch(err => console.log(err));
    
  }

  Logout(): void{
    this.afAuth.signOut().then(res => {
      this.currentUser = null;
      this.currentUser$.next(this.currentUser);
      this.router.navigateByUrl('/login').then();
    })
  }

  searchUserinDatabase(user_id: string): Observable<Userdata>{
    return this.afs.collection<Userdata>('users').doc<Userdata>(user_id).valueChanges();        
  }



}

export interface Userdata {
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  id?: string;
}