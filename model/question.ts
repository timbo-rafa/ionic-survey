export interface Question {
  header?: string
  id: number
  title: string
  type: string
  answers? : string[]
}

export interface Questions {
  [index: number]: Question
}