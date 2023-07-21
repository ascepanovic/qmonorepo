import { AnswerT } from ".";

export interface QuestionT {
  id: number;
  text: string;
  created_at: string;
  answers: AnswerT[];
}

export interface NextQuestionT {
  question: {
    id: number;
    category_id: number;
    question_id: number;
    question: QuestionT;
  };
  currentQuestionIndex: number;
}
