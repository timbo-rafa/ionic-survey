
export interface QuestionAnswer {
  id: number,
  type: string,
  title: string,
  rating?: number,
  answer?: string
}

export interface Submission {
  [index: number]: QuestionAnswer
}