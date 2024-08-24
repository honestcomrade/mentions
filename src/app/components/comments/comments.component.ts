
import { Comment } from '../../types/comment';
import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon'
import { FormatDatePipe } from '../../pipes/tansform.date.pipe';

@Component({
  selector: 'comments',
  templateUrl: 'comments.component.html',
  imports: [
    MatListModule,
    MatIconModule,
    FormatDatePipe,
  ],
  standalone: true,
})
export class CommentsComponent {
  @Input() comments: Comment[] = []
}