
export interface SubmissionItem {
  id: number,
  type: string,
  title: string,
  rating?: number,
  answer?: string
}

export interface Submission {
  [index: number]: SubmissionItem
}