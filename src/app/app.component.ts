import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MentionsComponent } from "./components/mention/mentions/mention.component";
import { ProfileThumbnail } from "./components/shared/profile/profile-thumbnail.component";
import { CommentsComponent } from './components/comments/comments.component';
import { COMMENT_LIST } from './data/person-list';
import { Comment } from './types/comment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MentionsComponent, ProfileThumbnail, CommentsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'mentions';
  comments: Comment[] = COMMENT_LIST
}
