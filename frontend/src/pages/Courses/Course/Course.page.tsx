import Toolbar from '@mui/material/Toolbar';
import Title from '../../../components/Title';
import * as React from 'react';
import { useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { PreloaderForPage } from '../../../components/PreloaderForPage';

export function CoursePage() {
  const courseId = useHistory().location.pathname.replace(/^\/courses\//, '');
  const { loading, error, course } = useTypedSelector((state) => state.courses);
  const { getCurrentCourse } = useActions();

  useEffect(() => {
    getCurrentCourse(+courseId);
  }, [courseId]);

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
      {course.map((item) => {
        return (
          <Container sx={{ mt: 4, mb: 4 }}>
            <Grid item xs={12} sx={{ mt: 1, mb: 2 }}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                <Title>Курс: {item.title}</Title>
              </Paper>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 1, mb: 4 }}>
              {loading ? (
                <CircularProgress sx={{ m: 10 }} />
              ) : (
                item.lessons.map((lesson) => {
                  return (
                    <Grid item xs={12} sm={6} md={4}>
                      <Card key={lesson.id}>
                        <CardContent>
                          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Тема урока
                          </Typography>
                          <Typography variant="h5" component="div">
                            {lesson.title}
                          </Typography>
                          <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
                            Статус: {lesson.watched ? 'Пройден' : lesson.block ? 'Заблокирован' : 'Доступен'}
                          </Typography>
                          <Typography variant="body2">{lesson.description}</Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small">
                            <Link to={`/lessons/${lesson.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                              Открыть урок
                            </Link>
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })
              )}
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
