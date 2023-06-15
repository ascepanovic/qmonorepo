import { AnswerT } from ".";

export interface QuestionT {
  id: number;
  text: string;
  created_at: string;
  answers: AnswerT[];
}
