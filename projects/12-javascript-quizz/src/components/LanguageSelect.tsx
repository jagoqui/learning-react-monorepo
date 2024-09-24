import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from '@mui/material';
import { useQuestionStore } from '../store/question';
import { LANGUAGES } from '../constants/languages.constants';

export const LanguageSelect = () => {
  const selectLanguage = useQuestionStore(
    ({ selectLanguage }) => selectLanguage
  );
  const createHandledClick = (
    language: string,
    fileName: string,
    tecnologie: string
  ) => selectLanguage(language, fileName, tecnologie);
  return (
    <>
      <List disablePadding sx={{ bgcolor: '#333' }}>
        {LANGUAGES.map((lang) => (
          <ListItem key={lang.id} disablePadding divider>
            <ListItemButton
              onClick={() =>
                createHandledClick(lang.language, lang.fileName, lang.name)
              }
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                {lang.svg()}
                <ListItemText
                  primary={lang.name}
                  sx={{ textAlign: 'center' }}
                />
              </Stack>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};
