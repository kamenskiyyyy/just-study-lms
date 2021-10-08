import Toolbar from '@mui/material/Toolbar';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import Title from '../../components/Title';
import * as React from 'react';
import { useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Link, useHistory } from 'react-router-dom';
import { PreloaderForPage } from '../../components/PreloaderForPage';
import { useActions } from '../../hooks/useActions';
import ReactPlayer from 'react-player/lazy';
import { baskEnd } from '../../index';

export function LessonPage() {
  const lessonId = useHistory().location.pathname.replace(/^\/lessons\//, '');
  const { loading, error, lesson } = useTypedSelector((state) => state.lesson);
  const { getCurrentLesson } = useActions();

  useEffect(() => {
    getCurrentLesson(+lessonId);
  }, []);

  if (loading) {
    return <PreloaderForPage />;
  }

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
      {lesson.map((item) => {
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
              {item.file.map((fileItem) => {
                return (
                  <Paper
                    key={fileItem}
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                    <ReactPlayer url={`${baskEnd}${fileItem}`} controls={true} light={true} width="100%" />
                  </Paper>
                );
              })}
            </Grid>
            <Grid item xs={12} sx={{ mt: 1, mb: 4, justifyContent: 'center' }}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}>
                <div dangerouslySetInnerHTML={{ __html: item.body }} />
              </Paper>
            </Grid>
            <Button variant="outlined">
              <Link to={'/homeworks/'} style={{ textDecoration: 'none', color: 'inherit' }}>
                Перейти к домашнему заданию
              </Link>
            </Button>
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
