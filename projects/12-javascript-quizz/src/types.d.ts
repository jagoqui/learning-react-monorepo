export interface Question {
  id: number;
  question: string;
  code: string;
  answers: string[];
  correctAnswerIndex: number;
  userSelectedAnswer?: number;
  isCorrectUserAnswer?: boolean;
}
