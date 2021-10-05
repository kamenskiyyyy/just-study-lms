import Title from '../../components/Title';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Container, Fab, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { Copyright } from '../../components/Copyright';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { useEffect } from 'react';

export function StorePage() {
  const { loading, error, courses } = useTypedSelector((state) => state.courses);
  const { getAllCourses } = useActions();

  useEffect(() => {
    getAllCourses();
  }, []);

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
        <Grid item xs={12} sx={{ mt: 1, mb: 2 }}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 60,
            }}>
            <Title>Каталог курсов</Title>
          </Paper>
        </Grid>
        <Grid container spacing={4} sx={{ mt: 1, mb: 4 }}>
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
