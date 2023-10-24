import React, {useState} from 'react';
import s from './styles.module.css'
import Container from "../../../components/container";
import {Button, IconButton, InputAdornment, InputBase, OutlinedInput, TextField, Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import {useDispatch} from "react-redux";
import {logout} from "../../../store/slice/authSlice";
import {getNumberWithSpaces} from "../../../utils/getNumberSpace";

const Header = ({search, setValue, value, user}) => {
    console.log(user)
    const dispatch = useDispatch()
    return (
        <div className={s.header}>
            <div className={s.header_top}>
                <div className={s.header_left}>
                    <TextField
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                search()
                            }
                        }}
                        sx={{
                            maxWidth: '300px',
                            width: '100%',
                        }} label="Поиск по логину"
                        variant="outlined"/>

                    <Button disabled={!value} onClick={search} color={'primary'}
                            sx={{height: '56px', marginLeft: '10px'}}
                            variant="outlined">
                        <SearchIcon/>
                    </Button>

                </div>

                <Button className={s.logout} onClick={() => dispatch(logout())} color={'primary'}
                        sx={{height: '56px', marginLeft: '10px'}}
                        variant="outlined">
                    <LogoutIcon/>
                </Button>

            </div>

            <div className={s.info}>
                <Typography variant={'h5'}>Баланс:</Typography>
                <Typography variant={'h6'} sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    lineHeight: '29px',
                    marginLeft: '5px'
                }}>{getNumberWithSpaces(user?.balance?.toFixed(2))}$</Typography>
            </div>

        </div>
    );
};

export default Header;
