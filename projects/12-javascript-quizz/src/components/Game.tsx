import SyntaxHighlighter from 'react-syntax-highlighter';
import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useQuestionStore } from '../store/question';
import { type Question } from '../types';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ArrowBackIosNew } from '@mui/icons-material';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { Footer } from './Footer';

const getBackgroundColor = (info: Question, index: number) => {
  const { userSelectedAnswer, correctAnswerIndex } = info;

  // Si el usuario no ha seleccionado una respuesta, o la opción no está involucrada
  if (
    userSelectedAnswer == null ||
    (index !== correctAnswerIndex && index !== userSelectedAnswer)
  ) {
    return 'transparent';
  }

  // Si esta es la respuesta correcta
  if (index === correctAnswerIndex) return 'green';

  // Si esta es la selección incorrecta del usuario
  return 'red';
};

const Question = ({ info }: { info: Question }) => {
  const selectAnswer = useQuestionStore(({ selectAnswer }) => selectAnswer);
  const language = useQuestionStore(({ language }) => language);

  const createHandledClick = (answerIndex: number) =>
    selectAnswer(info.id, answerIndex);

  return (
    <Card
      variant="outlined"
      sx={{ bgcolor: '#222', p: 2, textAlign: 'left', mt: 4 }}
    >
      <Typography variant="h5">{info.question}</Typography>
      <SyntaxHighlighter language={language} style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>
      <List disablePadding sx={{ bgcolor: '#333' }}>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              onClick={() => createHandledClick(index)}
              sx={{
                backgroundColor: getBackgroundColor(info, index),
              }}
            >
              <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export const Game = () => {
  const questions = useQuestionStore(({ questions }) => questions);
  const currentQuestionIndex = useQuestionStore(
    ({ currentQuestionIndex }) => currentQuestionIndex
  );
  const goNextQuestion = useQuestionStore(
    ({ goNextQuestion }) => goNextQuestion
  );
  const goPrevQuestion = useQuestionStore(
    ({ goPrevQuestion }) => goPrevQuestion
  );

  const questionInfo = questions[currentQuestionIndex];

  return (
    <>
      <Stack
        direction="row"
        gap={2}
        justifyContent="center"
        alignItems="center"
      >
        <IconButton
          onClick={goPrevQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <ArrowBackIosNew />
        </IconButton>
        {currentQuestionIndex + 1} / {questions.length}
        <IconButton
          onClick={goNextQuestion}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  );
};
