// my-component.component.ts
import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'profile-thumbnail',
  templateUrl: 'profile-thumbnail.component.html',
  imports: [
    NgStyle
  ],
  standalone: true,
})
export class ProfileThumbnail {
  @Input() imageUrl: any
  backgroundImage: string = ""
  ngOnInit() {
    this.backgroundImage = `url(${this.imageUrl})`
  }
}