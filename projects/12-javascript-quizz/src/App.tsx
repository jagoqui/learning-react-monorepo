import { Container, Stack, Typography } from '@mui/material';
import './App.css';
import { Start } from './components/Start';
import { useQuestionStore } from './store/question';
import { Game } from './components/Game';
import { LanguageSelect } from './components/LanguageSelect';

function App() {
  const questions = useQuestionStore(({ questions }) => questions);
  const tecnologie = useQuestionStore(({ tecnologie }) => tecnologie);

  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          direction="column"
          spacing={2}
          alignItems="center"
          justifyContent="center"
          pb={4}
        >
          <Typography variant="h2" component="h1">
            Quizz {tecnologie.toUpperCase()}
          </Typography>
          {!questions.length && <LanguageSelect />}
        </Stack>
        {questions.length ? <Game /> : <Start />}
      </Container>
    </main>
  );
}

export default App;
