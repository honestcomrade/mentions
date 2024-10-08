import { Injectable } from '@angular/core';
import { Person } from '../types/person';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor() { }

  notify(user: Person, commentText: string) {
    // this is meant to mock the functionality of notifying a user
    // used a service to keep the implementation detials abstract from the caller

    alert(`A notification has been sent to the following user: ${JSON.stringify(user)}. Comment contents: ${commentText}`)
  }
}