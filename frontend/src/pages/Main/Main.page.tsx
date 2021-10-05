import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import LearningProgressWidget from './LearningProgress.widget';
import CurrentCourseWidget from './CurrentCourse.widget';
import Box from '@mui/material/Box';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { useEffect } from 'react';
import { Button, Card, CardContent, CardMedia, CircularProgress, Fab } from '@mui/material';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://just-study.ru">
        Just Study
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export function MainPage() {
  const { loading, error, courses } = useTypedSelector((state) => state.courses);
  const { getAllCourses, getUserInfo } = useActions();

  useEffect(() => {
    getUserInfo();
    getAllCourses();
  }, [])

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
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Прогресс бар */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}>
              <LearningProgressWidget />
            </Paper>
          </Grid>
          {/* Текущий курс */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}>
              <CurrentCourseWidget />
            </Paper>
            {/* Каталог курсов */}
          </Grid>
        </Grid>
        <Grid container spacing={4} sx={{ mt: 1, mb: 4, justifyContent: 'center', alignContent: 'center' }}>
          {loading ? (
            <CircularProgress sx={{ m: 10 }} />
          ) : (
            courses.map((course) => {
              return (
                <Grid key={course.id} item xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      sx={{ height: 300 }}
                      image="https://source.unsplash.com/random"
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {course.title}
                      </Typography>
                      {course.category.map((item) => {
                        return (
                          <Fab
                            key={item}
                            variant="extended"
                            size="small"
                            color="default"
                            sx={{ mt: 1, mb: 3, mr: 2, fontSize: 12 }}>
                            <LocalOfferOutlinedIcon sx={{ mr: 1, fontSize: 18 }} />
                            {item}
                          </Fab>
                        );
                      })}
                      <Typography>{course.description}</Typography>
                    </CardContent>
                    <Button size="small" sx={{ justifyItems: 'end', mb: 2 }}>
                      Подробнее
                    </Button>
                  </Card>
                </Grid>
              );
            })
          )}
          {error && (
            <Typography mt={5} visibility={error ? 'visible' : 'hidden'} color="red">
              {error}
            </Typography>
          )}
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
}
