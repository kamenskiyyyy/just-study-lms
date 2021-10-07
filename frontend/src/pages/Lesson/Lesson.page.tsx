import Toolbar from '@mui/material/Toolbar';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import Title from '../../components/Title';
import * as React from 'react';
import { useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useHistory } from 'react-router-dom';
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
          <Container sx={{ mt: 4, mb: 4 }}>
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
            <Grid container spacing={2} sx={{ mt: 1, mb: 4 }}>
              {item.file.map((fileItem) => {
                return <ReactPlayer url={`${baskEnd}${fileItem}`} controls={true} light={true} />;
              })}
              {/*{loading ? (*/}
              {/*  <CircularProgress sx={{ m: 10 }} />*/}
              {/*) : (*/}
              {/*  item.lessons.map((lesson) => {*/}
              {/*    return (*/}
              {/*      <Grid item xs={12} sm={6} md={4}>*/}
              {/*        <Card key={lesson.id}>*/}
              {/*          <CardContent>*/}
              {/*            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>*/}
              {/*              Тема урока*/}
              {/*            </Typography>*/}
              {/*            <Typography variant="h5" component="div">*/}
              {/*              {lesson.title}*/}
              {/*            </Typography>*/}
              {/*            <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">*/}
              {/*              Статус: {lesson.watched ? 'Пройден' : lesson.block ? 'Заблокирован' : 'Доступен'}*/}
              {/*            </Typography>*/}
              {/*            <Typography variant="body2">{lesson.description}</Typography>*/}
              {/*          </CardContent>*/}
              {/*          <CardActions>*/}
              {/*            <Button size="small">*/}
              {/*              <Link to={`/lessons/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>*/}
              {/*                Открыть урок*/}
              {/*              </Link>*/}
              {/*            </Button>*/}
              {/*          </CardActions>*/}
              {/*        </Card>*/}
              {/*      </Grid>*/}
              {/*    );*/}
              {/*  })*/}
              {/*)}*/}
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
