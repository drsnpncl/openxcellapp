import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommentComponent } from './comment/comment.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { TopicComponent } from './topic/topic.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '',         component: LoginComponent },
  { path: 'topic',    component: TopicComponent },
  { path: 'post',     component: PostComponent },
  { path: 'comments', component: CommentComponent },
  { path: 'user',     component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
