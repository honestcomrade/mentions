import { Comment } from "../types/comment"
export function markupCommentText(comment: Comment): string {
  const markup: string[] = [];
  comment.mentions?.forEach(mention => {
    const matcher = `@${mention?.name}`

    const rest = comment.text.split(matcher).slice(1) // dump the first element it's empty string now
    rest.unshift(`<b>${matcher}</b>`)
    markup.push(rest.join(""))
  })
  return markup.join("")
}
