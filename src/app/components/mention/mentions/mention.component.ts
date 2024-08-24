import { MatListModule } from '@angular/material/list';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';

import { stringMatcher } from '../../../utility/string-matcher';
import { CommentService } from '../../../services/comment.service';
import { ProfileThumbnail } from "../../shared/profile/profile-thumbnail.component";
import { PERSONS } from '../../../data/person-list';
import {Person } from '../../../types/person';
import {Comment }from '../../../types/comment';

/**
 * @title Mention List Container
 */
@Component({
  selector: 'mention',
  templateUrl: 'mention.component.html',
  standalone: true,
  imports: [
    MatListModule,
    FormsModule,
    CommonModule,
    ProfileThumbnail
  ],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [CommentService]
})

export class MentionsComponent {
  @Input() inputOpen: boolean = false;
  selectedPerson?: Person
  readonly separatorKeysCodes = [ENTER, COMMA] as const
  mentionList = PERSONS
  text?: string
  typeAheadActive?: boolean = false
  matches?: Person[] = []
  @Output() commentAdded = new EventEmitter<Comment>();

  constructor(private commentService: CommentService) {}

  filterList(text: string) {
    const word = text.substring(1) // dump the @ character
    const matches = this.matches?.filter(f => stringMatcher(f.name, word))
    this.matches = matches
    console.log(this.matches)
  }

  onInputChange(event: Event) {
    const element = event.target as HTMLInputElement

    if (element?.value?.startsWith("@")) {
      this.typeAheadActive = true
      this.matches = this.mentionList
    } else {
      this.typeAheadActive = false
      this.matches = []
    }
    this.text = element?.value
    this.filterList(element.value)
  }

  onSubmit() {
    if(this.selectedPerson?.userID) {
      this.commentService.notify(this.selectedPerson, this.text ?? "")
      const now = new Date().getTime()

      this.commentAdded.emit({text: this.text ?? "", authorID: this.selectedPerson?.userID, timestampms: now})
    }
    // todo: emit pushing a new comment in
  
    // this would also be handled by the service in ideal world
    this.text = ""
  }

  selectPerson(id: number) {
    this.selectedPerson = this.mentionList.find(f => f.userID === id)
    this.text = `@${this.selectedPerson?.name} `
    document.querySelector("input")?.focus()
    this.typeAheadActive = false
    this.matches = []
  }
}