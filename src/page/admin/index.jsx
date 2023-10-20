import React, {useState} from 'react';
import Container from "../../components/container";
import s from './styles.module.css'
import Header from "./header";
import {Skeleton, Tab, Tabs, Typography} from "@mui/material";
import Info from "./info";
import History from "./history";
import {useGetUserMutation} from "../../store/manager.service";
import {toast} from "react-toastify";

const Admin = () => {
    const [value, setValue] = useState('')
    const [tab, setTab] = useState(0)
    const [getUser, {isLoading: isLoadingUser, data}] = useGetUserMutation()
    const [userData, setUserData] = useState({})
    const [startSerach, setStartSearch] = useState(false)
    const handleFindUser = () => {
        setStartSearch(true)
        getUser({login: value}).unwrap().then((res) => {
            setUserData(res.items?.find(f => f.login === value || f.id === value))
        }).catch((e) => {
            toast.error('Ошибка поиска')
        })
    }
    console.log(userData)
    const handleChange = (event, newValue) => {
        setTab(newValue);
    };
    return (
        <div className={s.main}>
            <Container>
                <Header setValue={setValue} search={handleFindUser} value={value}/>

                <div className={s.tabs}>
                    <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Информация о пользователе"/>
                        <Tab label="История операций"/>
                    </Tabs>
                </div>

                {(!value || !startSerach) ? <div className={s.content}>
                        <Typography variant={'h4'} sx={{textAlign: 'center'}} color={'rgba(0,0,0,0.5)'}>Введите логин или id
                            пользователя <br/> и нажмите поиск</Typography>
                    </div> :
                    <div className={s.content}>
                        {tab === 0 && (isLoadingUser ? <Skeleton variant="rectangular" width={'100%'} height={300}/> :
                            <Info userData={userData} isLoadingUser={isLoadingUser}/>)}
                        {tab === 1 && <History/>}
                    </div>
                }
            </Container>
        </div>
    );
};

export default Admin;
