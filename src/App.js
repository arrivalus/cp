import './App.css';
import Auth from "./page/auth";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectAuth, setAuth} from "./store/slice/authSlice";
import {tokenExpiredDiff} from "./utils/tokenExpiredDiff";
import axios from "axios";
import {BASE_URL} from "./utils/utils";
import {Navigate, Route, Routes} from "react-router-dom";
import Admin from "./page/admin";
import {Box, LinearProgress} from "@mui/material";

function App() {
    const dispatch = useDispatch()

    const user_auth = JSON.parse(localStorage.getItem('user') || "{}")
    const auth = useSelector(selectAuth)
    const [fakeLoading, setFakeLoading] = useState(true)
    const [limit, setLimit] = useState(tokenExpiredDiff(user_auth.token))

    useEffect(() => {
        setFakeLoading(true)
        axios.post(`${BASE_URL}api/Auth/refresh-token`, {
            token: {
                access_token: user_auth.token,
                refresh_token: user_auth.refresh_token
            }
        }).then((res) => {
            setLimit(tokenExpiredDiff(res.data.access_token))
            dispatch(setAuth({token: res.data.access_token, refresh_token: res.data.refresh_token}))
        }).catch(() => dispatch(logout())).finally(() => setFakeLoading(false))
    }, [])

    let timer;

    useEffect(() => {
        if (limit === null) return
        timer = setInterval(() => {
            if (limit === null) return
            setLimit(limit - 15)

        }, 15000)

        if (!auth.token) {
            clearInterval(timer)
        } else {
            if (limit <= 60) {
                clearInterval(timer)
                if (limit <= 1) {
                    setLimit(null)
                    dispatch(logout())
                } else {
                    setLimit(null)
                    axios.post(`${BASE_URL}api/Auth/refresh-token`, {
                        token: {
                            access_token: auth.token,
                            refresh_token: auth.refresh_token
                        }
                    }).then((res) => {
                        setLimit(tokenExpiredDiff(res.data.access_token))
                        dispatch(setAuth({token: res.data.access_token, refresh_token: res.data.refresh_token}))
                    }).catch(() => dispatch(logout()))

                }
            }
        }

        return () => clearInterval(timer)
    }, [limit])

    if (fakeLoading) return <Box sx={{width: '100%', background: 'rgb(244, 249, 255)', minHeight: '100dvh'}}>
        <LinearProgress/>
    </Box>

    return (
        <div className="App">
            <Routes>
                {!auth.token ?
                    <>
                        <Route path={'/login'} element={<Auth/>}/>
                        <Route path={'*'} element={<Navigate to="/login" replace/>}/>
                    </> :
                    <>
                        <Route path={'/admin'} element={<Admin/>}/>
                        <Route path={'*'} element={<Navigate to="/admin" replace/>}/>
                    </>
                }

            </Routes>
        </div>
    );
}

export default App;
