import React from 'react';
import {
  Avatar,
  Box,
  CssBaseline,
  Grid, Link,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink } from 'react-router-dom';
import { RouteNames } from '../RouterPages';
import { DatePicker, LoadingButton } from '@mui/lab';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

export interface IUserRegister {
  email: string;
  password: string;
  type: 'admin' | 'user' | 'teacher' | 'manager';
  firstName: string;
  secondName: string;
  birthDate: Date;
  phone: number;
  telegram: string;
  status: boolean;
}

export const RegisterPage = () => {
  const { loading } = useTypedSelector(state => state.auth);
  const { register } = useActions();
  const [birthDate, setBirthDate] = React.useState<Date | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    register({
      email: data.get('email'),
      password: data.get('password'),
      birthDate: birthDate,
      type: 'user',
      firstName: data.get('firstName'),
      secondName: data.get('secondName'),
      phone: Number(data.get('phone')),
      telegram: data.get('telegram'),
      status: true,
    } as IUserRegister);
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
        <Typography component='h1' variant='h5'>
          Регистрация
        </Typography>
        <Box component='form' onSubmit={onSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='fname'
                name='firstName'
                required
                fullWidth
                id='firstName'
                label='Имя'
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='secondName'
                label='Фамилия'
                name='secondName'
                autoComplete='lname'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email адрес'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Пароль'
                type='password'
                id='password'
                autoComplete='new-password'
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                label='Дата рождения'
                mask={'__.__.____'}
                value={birthDate}
                onChange={(newValue) => setBirthDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth name='birthDate' type='date' id='birthDate'
                                                    autoComplete='date' required />}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='phone'
                label='Телефон'
                type='phone'
                id='phone'
                autoComplete='tel'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='telegram'
                label='Telegram'
                type='text'
                id='telegram'
              />
            </Grid>
          </Grid>
          <LoadingButton
            loading={loading}
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Зарегистрироваться
          </LoadingButton>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link to={RouteNames.LOGIN} component={RouterLink} variant='body2'>
                Уже есть аккаунт? Войти
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box></>
  );
};
