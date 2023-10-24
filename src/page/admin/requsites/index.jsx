import React from 'react';
import {useGetRequsitsQuery} from "../../../store/manager.service";
import {Skeleton, Typography} from "@mui/material";
import s from './styles.module.css'
import classNames from "classnames";
import {toast} from "react-toastify";
import SearchIcon from '@mui/icons-material/Search';

const Reqisites = ({userData}) => {
    const {data, isLoading} = useGetRequsitsQuery({
        partnerId: userData.id
    }, {
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true,
        skip: !userData?.id
    })

    const handleClickCell = async (data) => {
        try {
            await navigator.clipboard.writeText(data)
            toast.success('Скопировано в буфер обмена')
        } catch (e) {
            console.log(e)
        }

    }

    if (isLoading) {
        return <Skeleton variant="rectangular" width={'100%'} height={400}/>
    }
    return (
        <div className={s.main}>
            <Typography variant={'h4'} sx={{
                marginBottom: '10px',
                marginTop: '20px'
            }}>Банковские реквизиты</Typography>

            {data?.bankAccounts.map((el, i) => <div className={s.main_item} key={i} style={{width: '100%'}}>

                <Typography variant={'h6'} sx={{
                    marginBottom: '0px',
                    paddingLeft: '15px',
                    marginTop: '10px',
                    width: '100%',
                    borderBottom: '1px solid rgb(244, 245, 246)'

                }}>{el?.objectName}</Typography>

                <div className={classNames(s.item)}>
                    <Typography variant={'body1'}>Название банка (короткое)</Typography>
                    <Typography
                        variant={'body2'}
                        onClick={() => handleClickCell(el?.bankShortName)}>{el?.bankShortName !== null ? el?.bankShortName : '---'}</Typography>
                    <Typography variant={'body1'}>ИНН банка</Typography>
                    <Typography
                        variant={'body2'}
                        onClick={() => handleClickCell(el?.bankINN)}>{el?.bankINN !== null ? el?.bankINN : '---'}</Typography>
                </div>

                <div className={classNames(s.item, s.item_o)}>
                    <Typography variant={'body1'}>БИК банка</Typography>
                    <Typography
                        variant={'body2'}
                        onClick={() => handleClickCell(el?.bankBIK)}>{el?.bankBIK !== null ? el?.bankBIK : '---'}</Typography>
                    <Typography variant={'body1'}>КПП банка</Typography>
                    <Typography
                        variant={'body2'}
                        onClick={() => handleClickCell(el?.bankKPP)}>{el?.bankKPP !== null ? el?.bankKPP : '---'}</Typography>
                </div>

                <div className={classNames(s.item)}>
                    <Typography variant={'body1'}>Корреспондентский счет</Typography>
                    <Typography onClick={() => handleClickCell(el?.bankKorrSchet)}
                                variant={'body2'}>{el?.bankKorrSchet !== null ? el?.bankKorrSchet : '---'}</Typography>
                    <Typography variant={'body1'}>Номер счета</Typography>
                    <Typography onClick={() => handleClickCell(el?.bankAccountNumber)}
                                variant={'body2'}>{el?.bankAccountNumber !== null ? el?.bankAccountNumber : '---'}</Typography>
                </div>
            </div>)}

            <br/>
            <Typography variant={'h4'} sx={{
                marginBottom: '10px',
                marginTop: '20px'
            }}>Криптокошельки</Typography>

            {data?.cryptoWallets.map((el, i) => <div className={s.main_item} key={i} style={{width: '100%'}}>

                <Typography variant={'h6'} sx={{
                    marginBottom: '0px',
                    paddingLeft: '15px',
                    marginTop: '10px',
                    width: '100%',
                    borderBottom: '1px solid rgb(244, 245, 246)'

                }}>{el?.objectName}</Typography>

                <div className={classNames(s.item)}>
                    <Typography variant={'body1'}>Токен</Typography>
                    <Typography
                        variant={'body2'}>{el?.cryptoCurrency !== null ? el?.cryptoCurrency : '---'}</Typography>
                    <Typography variant={'body1'}>Номер кошелька</Typography>
                    <Typography className={s.search} onClick={() => handleClickCell(el?.cryptoWallet)}
                                variant={'body2'}>{el?.cryptoWallet !== null ? `${el?.cryptoWallet?.slice(0, 5)}...${el?.cryptoWallet?.slice(-5,)}` : '---'}
                        <a
                            href={`https://tronscan.org/#/address/${el?.cryptoWallet}/transfers`} target={'_blank'}
                            className={s.icon}><SearchIcon/></a></Typography>
                </div>

                <div className={classNames(s.item, s.item_o)}>
                    <Typography variant={'body1'}>Протокол</Typography>
                    <Typography
                        variant={'body2'}>{el?.networkType !== null ? el?.networkType : '---'}</Typography>
                </div>
            </div>)}
        </div>
    );
};

export default Reqisites;
