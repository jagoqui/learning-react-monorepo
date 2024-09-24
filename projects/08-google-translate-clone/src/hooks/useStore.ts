import { type FromLanguage, type Language } from '../types';
import { type Action, type State } from '../types';
import { useReducer } from 'react';

// 1. Create initial state
const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false,
};

// 2. Create reducer function
/**
 * Reducer function for managing state in the application.
 *
 * @param state - The current state of the application.
 * @param action - The action object that describes the state change.
 * @returns The new state after applying the action.
 */
const reducer = (state: State, action: Action): State => {
  const actions: {
    [K in Action['type']]: (action: Extract<Action, { type: K }>) => State;
  } = {
    INTERCHANGE_LANGUAGES: (): State => ({
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage as Language,
    }),
    SET_FROM_LANGUAGE: (action): State => ({
      ...state,
      fromLanguage: action.payload,
    }),
    SET_TO_LANGUAGE: (action): State => ({
      ...state,
      toLanguage: action.payload,
    }),
    SET_FROM_TEXT: (action): State => ({
      ...state,
      loading: true,
      fromText: action.payload,
      result: '',
    }),
    SET_RESULT: (action): State => ({
      ...state,
      loading: false,
      result: action.payload,
    }),
  };

  return (actions[action.type] as (a: Action) => State)?.(action) ?? state;
};

export const useStore = () => {
  // 3. Create useReducer hook
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    interchangeLanguages: () => {
      dispatch({ type: 'INTERCHANGE_LANGUAGES' });
    },
    setFromLanguage: (payload: FromLanguage) => {
      dispatch({ type: 'SET_FROM_LANGUAGE', payload });
    },
    setToLanguage: (payload: Language) => {
      dispatch({ type: 'SET_TO_LANGUAGE', payload });
    },
    setFromText: (payload: string) => {
      dispatch({ type: 'SET_FROM_TEXT', payload });
    },
    setResult: (payload: string) => {
      dispatch({ type: 'SET_RESULT', payload });
    },
  };

  return {
    ...state,
    ...actions,
  };
};
