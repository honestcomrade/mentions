import { Person } from "./person"

export interface Comment {
  commentID?: number
  timestampms: number
  text: string
  mention?: Person
}