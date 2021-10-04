import React from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import {
  Avatar,
  Box,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid, Link,
  TextField, Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { RouteNames } from '../RouterPages';
import { Link as RouterLink } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

export interface IUserLogin {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const { loading, error } = useTypedSelector(state => state.auth);
  const { login } = useActions();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    login({ email: data.get('email'), password: data.get('password') } as IUserLogin);
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>Авторизация</Typography>
        {error && <Typography mt={1} visibility={error ? 'visible' : 'hidden'} color="red">{error}</Typography>}
        <Box component='form' onSubmit={onSubmit} sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email адрес'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Пароль'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' defaultChecked={true} />}
            label='Запомнить меня'
          />
          <LoadingButton loading={loading} variant='contained' type='submit' fullWidth sx={{ mt: 3, mb: 2 }}>
            Войти
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Не помню пароль
              </Link>
            </Grid>
            <Grid item>
              <Link to={RouteNames.REGISTER} component={RouterLink} variant='body2'>
                {'У меня нет аккаунта'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};
