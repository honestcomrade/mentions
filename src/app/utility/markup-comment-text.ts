import { Comment } from "../types/comment"
export function markupCommentText(comment: Comment): string {
  const matcher = `@${comment.mention?.name}`
  const rest = comment.text.split(matcher).slice(1) // dump the first element it's empty string now
  rest.unshift(`<b>${matcher}</b>`)
  return rest.join("")
}
