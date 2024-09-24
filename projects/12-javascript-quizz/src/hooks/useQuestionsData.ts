import { useQuestionStore } from '../store/question';

export const useQuestionsData = () => {
  const questions = useQuestionStore(({ questions }) => questions);

  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  questions.forEach((question) => {
    const { userSelectedAnswer, correctAnswerIndex } = question;
    if (userSelectedAnswer == null) unanswered++;
    else if (userSelectedAnswer === correctAnswerIndex) correct++;
    else incorrect++;
  });

  return { correct, incorrect, unanswered };
};
