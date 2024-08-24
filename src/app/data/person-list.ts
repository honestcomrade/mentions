import { Comment } from "../types/comment"
import { Person } from "../types/person";

export const PERSONS: Person[] = [
  { userID : 1, name: 'Kevin', avatarUrl:'https://cdn.avopix.com/photos/detail/d_418541_person-guy-man.webp'},
  { userID : 2, name: 'Jeff', avatarUrl:`https://image.shutterstock.com/z/avopix-2363625641.jpg`},
  { userID : 3, name: 'Bryan', avatarUrl:`https://image.shutterstock.com/z/avopix-1639755769.jpg`},
  { userID : 4, name: 'Gabbey', avatarUrl:`https://image.shutterstock.com/z/avopix-2477767447.jpg` },
];

export const COMMENT_LIST: Comment[] = [
  { 
    commentID: 1, 
    text: "This Task was assigned to Daryl Babb", 
    timestampms: 1724346166000,
    mention: PERSONS[0]
  },
  { 
    commentID: 2, 
    text: "Waiting on Parts", 
    timestampms: 1724331166000, 
    mention: PERSONS[1] 
  },
]