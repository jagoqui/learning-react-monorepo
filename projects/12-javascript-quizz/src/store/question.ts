import { create } from 'zustand';
import { Question } from '../types';
import confetti from 'canvas-confetti';
import { devtools, persist } from 'zustand/middleware';
import language from 'react-syntax-highlighter/dist/esm/languages/hljs/1c';

interface State {
  questions: Question[];
  currentQuestionIndex: number;
  language: typeof language;
  fileName: string;
  tecnologie: string;
  selectLanguage: (
    lang: typeof language,
    fileName: string,
    tecnologie: string
  ) => void;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPrevQuestion: () => void;
  goToHome: () => void;
  reset: () => void;
}

export const useQuestionStore = create<State>()(
  devtools(
    persist(
      (set, get): State => ({
        questions: [],
        currentQuestionIndex: 0,
        language: 'javascript',
        fileName: 'javascript',
        tecnologie: 'Javascript',
        selectLanguage: (
          lang: typeof language,
          fileName: string,
          tecnologie: string
        ) => set({ language: lang, fileName, tecnologie }),
        fetchQuestions: async (limit: number) => {
          const res = await fetch(`/${get().fileName}-questions.json`);
          const json = await res.json();

          const questions =
            json.sort(() => Math.random() - 0.5).slice(0, limit) ?? [];
          set({ questions }, false, 'FETCH_QUESTIONS');
        },
        selectAnswer: (questionId: number, answerIndex: number) => {
          set(
            (state) => {
              const questions = state.questions.map((question) => {
                if (question.id === questionId) {
                  const isCorrectUserAnswer =
                    question.correctAnswerIndex === answerIndex;
                  if (isCorrectUserAnswer) confetti();
                  return {
                    ...question,
                    userSelectedAnswer: answerIndex,
                    isCorrectUserAnswer,
                  };
                }
                return question;
              });
              return { questions };
            },
            false,
            'SELECT_ANSWER'
          );
        },
        goNextQuestion: () => {
          const { questions, currentQuestionIndex } = get();
          if (currentQuestionIndex === questions.length - 1) {
            return;
          }

          set(
            { currentQuestionIndex: currentQuestionIndex + 1 },
            false,
            'GO_NEXT_QUESTION'
          );
        },
        goPrevQuestion: () => {
          const { currentQuestionIndex } = get();
          if (currentQuestionIndex === 0) {
            return;
          }

          set(
            { currentQuestionIndex: currentQuestionIndex - 1 },
            false,
            'GO_PREVIOUS_QUESTION'
          );
        },
        goToHome: () => {
          set({ questions: [], currentQuestionIndex: 0 }, false, 'GO_HOME');
        },
        reset: () => {
          set({ currentQuestionIndex: 0 }, false, 'RESET_GAME');
        },
      }),
      { name: 'question-store' }
    ),
    { serialize: { options: true } }
  )
);
