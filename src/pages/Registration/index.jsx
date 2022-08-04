import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { fetchSignup, selectIsAuth } from '../../redux/slices/auth';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth)

  const dispatch = useDispatch()

  const { register, handleSubmit, formState: {errors, isValid} } = useForm({
    defaultValues: {
      name: 'lol',
      email: '1@kek.com',
      password: 'lol_1234'
    },
    mode: 'onChange'
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchSignup(values))
    if (!data.payload) {
      return alert('Ошибка регистрации')
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  if (isAuth) {
    return <Navigate to="/" />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <TextField
          className={styles.field}
          label="Имя"
          error={ Boolean(errors.name?.message) }
          helperText={ errors.name?.message }
          type="text"
          {...register('name', { required: 'Укажите имя' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          error={ Boolean(errors.email?.message) }
          helperText={ errors.email?.message }
          type="email"
          {...register('email', { required: 'Укажите почту' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          error={ Boolean(errors.password?.message) }
          helperText={ errors.password?.message }
          type="text"
          {...register('password', { required: 'Укажите пароль' })}
          fullWidth
        />
        <Button type="submit" disabled={ !isValid } size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
