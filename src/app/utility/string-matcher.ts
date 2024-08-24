export function stringMatcher(s1: string, s2: string): boolean {
  return s1.toLocaleLowerCase()?.includes(s2.toLocaleLowerCase())
}