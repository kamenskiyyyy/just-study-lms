import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import * as React from 'react';
import { useEffect } from 'react';
import { PreloaderForPage } from '../../components/PreloaderForPage';
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
import Toolbar from '@mui/material/Toolbar';
import Title from '../../components/Title';
import { Link } from 'react-router-dom';

export function HomeWorksPage() {
  const { loading, error, homeworks } = useTypedSelector((state) => state.homework);
  const { getAllHomeworks } = useActions();

  useEffect(() => {
    getAllHomeworks();
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
      <Container sx={{ mt: 4, mb: 4 }}>
        <Grid item xs={12} sx={{ mt: 1, mb: 2 }}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}>
            <Title>Мои домашние задания</Title>
          </Paper>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 1, mb: 4 }}>
          {loading ? (
            <CircularProgress sx={{ m: 10 }} />
          ) : (
            homeworks.map((item) => {
              return (
                <Grid key={item.id} item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Название домашнего задания
                      </Typography>
                      <Typography variant="h5" component="div">
                        {item.title}
                      </Typography>
                      <Typography variant="body2">{item.description}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">
                        <Link to={`/homeworks/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          Открыть задание
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
