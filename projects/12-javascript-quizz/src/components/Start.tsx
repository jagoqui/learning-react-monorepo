import { Button } from '@mui/material';
import { useQuestionStore } from '../store/question';

const LIMIT_QUESTIONS = 30;

export const Start = () => {
  const fetchQuestions = useQuestionStore(
    ({ fetchQuestions }) => fetchQuestions
  );
  return (
    <Button variant="contained" onClick={() => fetchQuestions(LIMIT_QUESTIONS)}>
      Empezar
    </Button>
  );
};
