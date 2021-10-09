import Toolbar from '@mui/material/Toolbar';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import Title from '../../../components/Title';
import { useHistory } from 'react-router-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useActions';
import { PreloaderForPage } from '../../../components/PreloaderForPage';
import { ChoiceFromList } from '../../../components/Questions/ChoiceFromList/ChoiceFromList';
import { WriteWord } from '../../../components/Questions/WriteWord/WriteWord';
import { IWriteWordItem } from '../../../components/Questions/WriteWord/WriteWordItem';

export function HomeWorkPage() {
  const homeworkId = useHistory().location.pathname.replace(/^\/homeworks\//, '');
  const { loading, error, homework } = useTypedSelector((state) => state.homework);
  const { getCurrentHomework } = useActions();

  useEffect(() => {
    getCurrentHomework(+homeworkId);
  }, []);

  if (loading) {
    return <PreloaderForPage />;
  }

  const typeWriteWord: IWriteWordItem[] = [
    {
      id: 1,
      before: 'The man eat',
      after: 'on the street. (глагол eat)',
      answers: ['street food', 'fast food'],
    },
    {
      id: 2,
      before: 'The woman go to',
      after: 'with boyfriend.',
      answers: ['the mac'],
    },
  ];

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}>
      <Toolbar />
      {homework.map((item) => {
        return (
          <Container key={item.id} sx={{ mt: 4, mb: 4, display: 'flex', flexDirection: 'column' }}>
            <Grid item xs={12} sx={{ mt: 1, mb: 2 }}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                <Title>Урок: {item.title}</Title>
                <Typography variant="body1">{item.description}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sx={{ mt: 1, mb: 4, justifyContent: 'center' }}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}>
                {/*// @ts-ignore*/}
                {item.type === 'choiceFromList' && <ChoiceFromList typeChangeWords={item.body} />}
                {/*// @ts-ignore*/}
              </Paper>
              <Grid item xs={12} sx={{ mt: 1, mb: 4, justifyContent: 'center' }}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                  }}>
                  <WriteWord typeWriteWord={typeWriteWord} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        );
      })}
      {error && (
        <Typography mt={5} visibility={error ? 'visible' : 'hidden'} color="red">
          {error}
        </Typography>
      )}
    </Box>
  );
}
