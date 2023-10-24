import React, {useState} from 'react';
import Container from "../../components/container";
import s from './styles.module.css'
import Header from "./header";
import {Skeleton, Tab, Tabs, Typography} from "@mui/material";
import Info from "./info";
import History from "./history";
import {useGetArticlesQuery, useGetUserMutation} from "../../store/manager.service";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {selectUser, setUser} from "../../store/slice/userSlice";
import HistoryAll from "./history_all";
import Reqisites from "./requsites";

const Admin = () => {
    const dispatch = useDispatch()
    const {user} = useSelector(selectUser)

    const [getUser, {isLoading: isLoadingUser}] = useGetUserMutation()

    const [value, setValue] = useState('')
    const [tab, setTab] = useState(0)
    const [startSerach, setStartSearch] = useState(false)
    const handleFindUser = () => {
        setStartSearch(true)
        getUser({login: value}).unwrap().then((res) => {
            dispatch(setUser({...res.items?.find(f => f.login.toLowerCase() === value.toLowerCase() || f.id === value)}))
        }).catch((e) => {
            toast.error('Ошибка поиска')
        })
    }

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };
    return (
        <div className={s.main}>
            <Container>
                <Header user={user} setValue={setValue} search={handleFindUser} value={value}/>

                <div className={s.tabs}>
                    <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Информация о пользователе"/>
                        <Tab label="История операций"/>
                        <Tab label="Портфели"/>
                        <Tab label="Реквизиты"/>
                    </Tabs>
                </div>

                {((!value || !startSerach)) ? <div className={s.content}>
                        <Typography variant={'h4'} sx={{textAlign: 'center'}} color={'rgba(0,0,0,0.5)'}>Введите логин
                            пользователя <br/> и нажмите поиск</Typography>
                    </div> :
                    <div className={s.content}>
                        {tab === 0 && (isLoadingUser ? <Skeleton variant="rectangular" width={'100%'} height={300}/> :
                            <Info userData={user} isLoadingUser={isLoadingUser}/>)}
                        {tab === 1 && <History value={value} userData={user}/>}
                        {tab === 2 && <HistoryAll userData={user}/>}
                        {tab === 3 && <Reqisites userData={user}/>}
                    </div>
                }
            </Container>
        </div>
    );
};

export default Admin;
