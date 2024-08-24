import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MentionsComponent } from "./components/mention/mentions/mention.component";
import { ProfileThumbnail } from "./components/shared/profile/profile-thumbnail.component";
import { CommentsComponent } from './components/comments/comments.component';
import { COMMENT_LIST } from './data/person-list';
import { Comment } from './types/comment';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MentionsComponent, ProfileThumbnail, CommentsComponent, MatIconModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  title = 'mentions';
  comments: Comment[] = COMMENT_LIST
  inputOpen: boolean = false;

  toggleInput() {
    this.inputOpen = !this.inputOpen
  }
}
