import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

import { stringMatcher } from '../../../utility/string-matcher';
import { CommentService } from '../../../services/comment.service';
import { ProfileThumbnail } from "../../shared/profile/profile-thumbnail.component";
import { PERSONS } from '../../../data/person-list';
import { Person } from '../../../types/person';
import { Comment }from '../../../types/comment';

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
  providers: [CommentService]
})

export class MentionsComponent {
  @Input() inputOpen: boolean = false;
  @Output() commentAdded = new EventEmitter<Comment>();
  selectedPerson?: Person
  mentionList = PERSONS
  text?: string
  typeAheadActive?: boolean = false
  matches?: Person[] = []

  constructor(private commentService: CommentService) {}

  filterList(text: string) {
    const word = text.substring(1) // ignore the @ character
    const matches = this.matches?.filter(f => stringMatcher(f.name, word))
    this.matches = matches
  }

  onInputChange(event: Event) {
    const element = event.target as HTMLInputElement

    // limitation, only allows for @mentions at beginning of input text
    if (element?.value?.startsWith("@")) {
      this.typeAheadActive = true
      this.matches = this.mentionList
    } else {
      this.typeAheadActive = false
      this.matches = []
    }
    this.text = element?.value
    this.filterList(element.value)
    // handle partial deletion of tagged user after they were tagged
    if (this.selectedPerson) {
      if(!element.value?.includes(this.selectedPerson?.name)) {
        this.selectedPerson = undefined
      }
    }
  }

  onSubmit() {
    if(this.selectedPerson?.userID) {
      this.commentService.notify(this.selectedPerson, this.text ?? "")
    }
    const now = new Date().getTime()
    this.commentAdded.emit({text: this.text ?? "", mention: this.selectedPerson, timestampms: now})
    this.text = ""
    this.selectedPerson = undefined
  }

  selectPerson(id: number) {
    this.selectedPerson = this.mentionList.find(f => f.userID === id)
    this.text = `@${this.selectedPerson?.name} `
    document.querySelector("input")?.focus()
    this.typeAheadActive = false
    this.matches = []
  }
}