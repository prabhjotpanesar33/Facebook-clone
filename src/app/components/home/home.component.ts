import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { AuthService, Userdata } from "E:/facebook/src/app/services/auth.service"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  images: any[] = [
    'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg',
    'https://placekitten.com/640/360',
    'https://placebeard.it/640x360',
    'https://www.placecage.com/640/360',
    'https://picsum.photos/640/360',
    'https://www.fillmurray.com/640/360'
  ];

  posts: any[] = [];
  user: Userdata;
  subs: Subscription[] = [];

  constructor(private postService: PostService,
    private authService: AuthService) { }

  async ngOnInit(): Promise<void>  {
     this.subs.push(this.postService.getAllPosts().subscribe(async (posts) => {
      this.posts = posts;
      console.log(posts);
      
    }));

    this.subs.push(
      this.authService.CurrentUser().subscribe(user =>{
        this.user = user;
      })
    )

  }


  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }

  postMessage(form: NgForm): void {
//    console.log(form.value);
const {message} = form.value;
this.postService.postMessage(message,`${this.user.firstName} ${this.user.lastName}`,{
  avatar: this.user.avatar,
  lastName: this.user.lastName,
  firstName: this.user.firstName

});
form.resetForm();  
  }
  logout(): void{
    this.authService.Logout();
  }
}
