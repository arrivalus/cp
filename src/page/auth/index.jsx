import React from 'react';
import s from './styles.module.css'
import {Button, TextField, Typography} from "@mui/material";
import {useFormik} from "formik";
import {useLoginMutation} from "../../store/auth.service";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {setAuth} from "../../store/slice/authSlice";
import {useNavigate} from "react-router-dom";
import {parseJwt} from "../../utils/parseJwt";

const Auth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, {isLoading}] = useLoginMutation()

    const formik = useFormik({
        initialValues: {
            loginOrEmail: '',
            password: ''
        },
        validate: (values) => {
            const errors = {}

            if (!values.loginOrEmail) {
                errors.loginOrEmail = 'Обязательное поле'
            }
            if (!values.password) {
                errors.password = 'Обязательное поле'
            } else if (values.password.length < 4) {
                errors.password = 'Минимальная длина пароля - 4 смвола'
            }

            return errors
        },
        onSubmit: async (values) => {
            try {
                const res = await login({loginOrEmail: values.loginOrEmail, password: values.password})

                if (res.error?.status && (res.error?.status === 400 || res.error.originalStatus === 400)) {
                    toast.error(
                        (res.error.data.errors && res.error.data.errors.LoginOrEmail && res.error.data.errors.LoginOrEmail[0])
                        || (res.error.data && res.error.data) || 'Ошибка')
                } else if (res?.data?.access_token && res?.data?.refresh_token) {
                    const decoded = parseJwt(res.data.access_token);
                    const key = Object.keys(decoded).find((elem) => elem.includes("role"));
                    const role = decoded[key]

                    if (role === 'Manager' || role === 'Accountant') {
                        dispatch(setAuth({
                            token: res.data.access_token,
                            refresh_token: res.data.refresh_token
                        }))
                        setTimeout(() => navigate('/admin'), 0)
                    } else {
                        toast.error('Вы не админ!')
                    }


                } else {
                    toast.error('Неверный логин или пароль')
                }

            } catch (e) {
                toast.error('Ошибка')
            }
        }
    })
    return (
        <div className={s.auth}>
            <div className={s.content}>
                <Typography variant="h3">
                    Авторизация
                </Typography>

                <form className={s.form} onSubmit={(e) => e.preventDefault()}>
                    <TextField
                        name={'loginOrEmail'}
                        value={formik.values.loginOrEmail}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={Boolean(formik.touched.loginOrEmail && formik.errors.loginOrEmail)}
                        helperText={formik.touched.loginOrEmail && formik.errors.loginOrEmail}
                        label="Логин"
                        variant="standard"
                    />
                    <TextField
                        type={'password'}
                        name={'password'}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={Boolean(formik.touched.password && formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        label="Пароль"
                        variant="standard"
                    />
                    <Button disabled={isLoading} type={'submit'} onClick={formik.handleSubmit} variant="outlined" sx={{
                        height: '48px',
                        marginTop: '20px'
                    }}>Войти</Button>
                </form>
            </div>
        </div>
    );
};

export default Auth;
