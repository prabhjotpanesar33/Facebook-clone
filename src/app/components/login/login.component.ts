import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];

  constructor(private authService: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.subs.push(
      this.authService.UserData.subscribe(user => {
        if (user) {
          this.router.navigateByUrl('/').then();
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }

  login(form: NgForm): void {
    const { email, password } = form.value;
    if (!form.valid) {
      return;
    }
    this.authService.signIn(email, password);
    form.resetForm;

  }

  openRegister(): void {
    const dialogRef = this.matDialog.open(RegisterComponent, {
      role: 'dialog',
      height: '488px',
      width: '488px'
    })
    dialogRef.afterClosed().subscribe(result => {
      const { fname, lname, email, password, avatar } = result;
      console.log(result);

      if (result !== undefined) {
        this.authService.signUp(email, password, fname, lname, avatar);
      }else{
        return;
      }
    })
  }

}
