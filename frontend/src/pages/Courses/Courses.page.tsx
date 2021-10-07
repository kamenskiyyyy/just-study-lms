import Toolbar from '@mui/material/Toolbar';
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
import Title from '../../components/Title';
import * as React from 'react';
import { useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { Link } from 'react-router-dom';

export function CoursesPage() {
  const { loading, error, courses } = useTypedSelector((state) => state.courses);
  const { getAllCourses } = useActions();

  useEffect(() => {
    getAllCourses();
  }, []);

  if (loading) {
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
          <CircularProgress sx={{ m: 10 }} />
        </Container>
      </Box>
    );
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
      <Container sx={{ mt: 4, mb: 4 }}>
        <Grid item xs={12} sx={{ mt: 1, mb: 2 }}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 60,
            }}>
            <Title>Мои курсы</Title>
          </Paper>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 1, mb: 4 }}>
          {loading ? (
            <CircularProgress sx={{ m: 10 }} />
          ) : (
            courses.map((item) => {
              return (
                <Grid item xs={12}>
                  <Card key={item.id}>
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Название курса
                      </Typography>
                      <Typography variant="h5" component="div">
                        {item.title}
                      </Typography>
                      <Typography variant="body2">{item.description}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">
                        <Link to={`/courses/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          Открыть курс
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
      {error && (
        <Typography mt={5} visibility={error ? 'visible' : 'hidden'} color="red">
          {error}
        </Typography>
      )}
    </Box>
  );
}
