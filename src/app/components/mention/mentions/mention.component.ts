import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
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
  mentions: Person[] = []
  mentionList = PERSONS
  text?: string
  typeAheadActive?: boolean = false
  matches?: Person[] = []
  partial: string = ""
  
  @HostListener('window:keypress', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.key == '@'){
      this.matches = this.mentionList
      this.typeAheadActive = true;
      console.log(event.key);
      this.partial = "@"
    } else {
      const pattern = /^[a-zA-Z0-9]*$/;   
      const inputChar = String.fromCharCode(Number(event.key));
  
      if (!pattern.test(inputChar)) {
        this.partial += event.key
      }
    }
    this.updateMentions()
  }

  updateMentions() {
    // keeps the mentions list in sync with the input text, in case some chars were deleted
    this.mentions = this.mentions?.filter(mention => {
      return this.text?.includes(mention.name)
    });
  }

  constructor(private commentService: CommentService) {}

  filterList(text: string) {
    const word = text.substring(1) // ignore the @ character
    const matches = this.matches?.filter(f => stringMatcher(f.name, word))
    this.matches = matches
  }

  onInputChange(event: Event) {
    const element = event.target as HTMLInputElement

    this.text = element?.value
    this.filterList(element.value)
  
  }

  onSubmit() {
    if(this.mentions?.length > 0) {
      this.commentService.notify(this.mentions, this.text ?? "")
    }
    const now = new Date().getTime()
    this.commentAdded.emit({text: this.text ?? "", mentions: this.mentions, timestampms: now})
    this.text = ""
    this.mentions = []
  }

  replacePartialMatch(str: string, partial: string, full: string) {
    const regex = new RegExp(partial, 'g');
    return str.replace(regex, full);
  }

  selectPerson(id: number) {
    const matchingPerson = this.mentionList.find(f => f.userID === id)
    if (matchingPerson) {
      this.mentions.push(matchingPerson)
      // TODO: to support multiple mentions, need to crawl back and replace only the partial text with the matches name
      // this.replacePartialMatch()
      this.text = `@${matchingPerson?.name} `
      document.querySelector("input")?.focus()
      this.typeAheadActive = false
      this.matches = []
    }
  }
}