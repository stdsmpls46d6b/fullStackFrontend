import React from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from 'react-hook-form'

import styles from "./Login.module.scss";
import { fetchLogin, selectIsAuth } from "../../redux/slices/auth";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth)

  const dispatch = useDispatch()

  const { register, handleSubmit, setError, formState: {errors, isValid} } = useForm({
    defaultValues: {
      email: 'lol@kek.com',
      password: 'lol_1234'
    },
    mode: 'onChange'
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchLogin(values))
    if (!data.payload) {
      return alert('Ошибка авторизации')
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
        Вход в аккаунт
      </Typography>
      <form onSubmit={ handleSubmit(onSubmit) }>
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
          type="password"
          {...register('password', { required: 'Укажите пароль' })}
          fullWidth
        />
        <Button type="submit" disabled={ !isValid } size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
