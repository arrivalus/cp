import React, {useState} from 'react';
import s from './styles.module.css'
import Container from "../../../components/container";
import {Button, IconButton, InputAdornment, InputBase, OutlinedInput, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import {useDispatch} from "react-redux";
import {logout} from "../../../store/slice/authSlice";

const Header = ({search, setValue, value}) => {
    const dispatch = useDispatch()
    return (
        <div className={s.header}>
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
                    }} label="Поиск по логину или ID"
                    variant="outlined"/>

                <Button disabled={!value} onClick={search} color={'primary'}
                        sx={{height: '56px', marginLeft: '10px'}}
                        variant="outlined">
                    <SearchIcon/>
                </Button>
            </div>

            <Button onClick={() => dispatch(logout())} color={'primary'}
                    sx={{height: '56px', marginLeft: '10px'}}
                    variant="outlined">
                <LogoutIcon/>
            </Button>
        </div>
    );
};

export default Header;
