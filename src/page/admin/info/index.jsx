import React from 'react';
import s from './styles.module.css'
import {Skeleton, Typography} from "@mui/material";
import classNames from "classnames";

const Info = ({userData, isLoadingUser}) => {

    if (!userData) {
        return <Typography variant={'h4'} sx={{textAlign: 'center'}} color={'rgba(0,0,0,0.5)'}>Пользователь не
            найден</Typography>
    }

    return (
        <div className={s.wrapper}>
            <>
                <Typography variant={'h4'} sx={{
                    marginBottom: '10px',
                    marginTop: '20px'
                }}>Общая информация</Typography>
                <div className={s.content}>

                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>ID</Typography>
                        <Typography variant={'body2'}>{userData?.id || '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>StoreId</Typography>
                        <Typography
                            variant={'body2'}>{userData?.storeId !== null ? userData?.storeId : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>Логин</Typography>
                        <Typography variant={'body2'}>{userData?.login !== null ? userData?.login : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>password</Typography>
                        <Typography
                            variant={'body2'}>{userData?.password !== null ? userData?.password : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>Имя</Typography>
                        <Typography
                            variant={'body2'}>{userData?.firstName !== null ? userData?.firstName : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>Фамилия</Typography>
                        <Typography
                            variant={'body2'}>{userData?.lastName !== null ? userData?.lastName : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>Отчество</Typography>
                        <Typography
                            variant={'body2'}>{userData?.middleName !== null ? userData?.middleName : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>Телефон</Typography>
                        <Typography
                            variant={'body2'}>{userData?.phoneNumber !== null ? userData?.phoneNumber : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>email</Typography>
                        <Typography variant={'body2'}>{userData?.email !== null ? userData?.email : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>telegram </Typography>
                        <Typography
                            variant={'body2'}>{userData?.telegram !== null ? userData?.telegram : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>Логин инвайтера </Typography>
                        <Typography
                            variant={'body2'}>{userData?.inviterLogin !== null ? userData?.inviterLogin : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>Id инвайтера </Typography>
                        <Typography
                            variant={'body2'}>{userData?.inviterId !== null ? userData?.inviterId : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>Дата создания </Typography>
                        <Typography
                            variant={'body2'}>{userData?.creationDate !== null ? userData?.creationDate : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>Верификация </Typography>
                        <Typography
                            variant={'body2'}>{userData?.verificationDate !== null ? userData?.verificationDate : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>Активирован </Typography>
                        <Typography variant={'body2'}>{userData?.isActivated === false ? 'Нет' : 'Да'} </Typography>
                    </div>
                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>Страна </Typography>
                        <Typography
                            variant={'body2'}>{userData?.country !== null ? userData?.country : '---'} </Typography>
                    </div>
                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>Город </Typography>
                        <Typography variant={'body2'}>{userData?.city !== null ? userData?.city : '---'} </Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>ConfirmationType </Typography>
                        <Typography
                            variant={'body2'}>{userData?.confirmationType !== null ? userData?.confirmationType : '---'} </Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>rang </Typography>
                        <Typography variant={'body2'}>{userData?.rang !== null ? userData?.rang : '---'} </Typography>
                    </div>
                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>Посетителей </Typography>
                        <Typography
                            variant={'body2'}>{userData?.visitorsCount !== null ? userData?.visitorsCount : '---'} </Typography>
                    </div>
                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>Аватарка </Typography>
                        <Typography variant={'body2'}>{userData?.image !== null ? userData?.image : '---'} </Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>vkontakte </Typography>
                        <Typography
                            variant={'body2'}>{userData?.vkontakte !== null ? userData?.vkontakte : '---'} </Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>OK </Typography>
                        <Typography
                            variant={'body2'}>{userData?.twitter !== null ? userData?.twitter : '---'} </Typography>
                    </div>
                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>Язык </Typography>
                        <Typography
                            variant={'body2'}>{userData?.language !== null ? userData?.language : '---'} </Typography>
                    </div>
                </div>
            </>
            <>
                <Typography variant={'h4'} sx={{
                    marginBottom: '10px',
                    marginTop: '20px'
                }}>Финансы</Typography>
                <div className={s.content}>

                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>Баланс</Typography>
                        <Typography
                            variant={'body2'}>{userData?.balance !== null ? userData?.balance : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>Баланс бизнес</Typography>
                        <Typography
                            variant={'body2'}>{userData?.balanceBusiness !== null ? userData?.balanceBusiness : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>Баланс Usdc</Typography>
                        <Typography
                            variant={'body2'}>{userData?.balanceUsdc !== null ? userData?.balanceUsdc : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>Баланс Bitcoin</Typography>
                        <Typography
                            variant={'body2'}>{userData?.balanceBitcoin !== null ? userData?.balanceBitcoin : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>Баланс Ethereum</Typography>
                        <Typography
                            variant={'body2'}>{userData?.balanceEthereum !== null ? userData?.balanceEthereum : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>Баланс Litecoin</Typography>
                        <Typography
                            variant={'body2'}>{userData?.balanceLitecoin !== null ? userData?.balanceLitecoin : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>riskType</Typography>
                        <Typography
                            variant={'body2'}>{userData?.riskType !== null ? userData?.riskType : '---'}</Typography>
                    </div>
                </div>
            </>
            <>
                <Typography variant={'h4'} sx={{
                    marginBottom: '10px',
                    marginTop: '20px'
                }}>Документы</Typography>
                <div className={s.content}>

                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>№ паспорта</Typography>
                        <Typography
                            variant={'body2'}>{userData?.passportNumber !== null ? userData?.passportNumber : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>Серия</Typography>
                        <Typography
                            variant={'body2'}>{userData?.passportSerial !== null ? userData?.passportSerial : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>Кем выдан</Typography>
                        <Typography
                            variant={'body2'}>{userData?.passportIssuer !== null ? userData?.passportIssuer : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>Дата выдачи</Typography>
                        <Typography
                            variant={'body2'}>{userData?.passportIssueDate !== null ? userData?.passportIssueDate : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>Адрес регистрации</Typography>
                        <Typography
                            variant={'body2'}>{userData?.addressReg !== null ? userData?.addressReg : '---'}</Typography>
                    </div>
                </div>
            </>


        </div>
    );
};

export default Info;
