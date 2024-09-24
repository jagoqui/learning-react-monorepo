import { Button } from '@mui/material';
import { useQuestionsData } from '../hooks/useQuestionsData';
import { useQuestionStore } from '../store/question';

export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionsData();
  const reset = useQuestionStore(({ reset }) => reset);
  const goToHome = useQuestionStore(({ goToHome }) => goToHome);

  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❓ ${unanswered} sin responder`}</strong>
      <div style={{ marginTop: '16px' }}>
        <Button onClick={() => reset()}>Resetear juego</Button>
        <Button onClick={() => goToHome()}>Ir al inicio</Button>
      </div>
    </footer>
  );
};
