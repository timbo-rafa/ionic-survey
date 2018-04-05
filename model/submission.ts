
export interface SubmissionItem {
  id: number
  answer: string
}

export interface Submission {
  [index: number]: SubmissionItem
}