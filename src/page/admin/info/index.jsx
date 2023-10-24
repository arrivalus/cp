import React, {useState} from 'react';
import s from './styles.module.css'
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent, FormControl,
    FormControlLabel,
    FormLabel, Radio, RadioGroup,
    Skeleton,
    Typography
} from "@mui/material";
import classNames from "classnames";
import {useDeleteDocumentsMutation, useGetDocumentsQuery, useVerifyUserMutation} from "../../../store/manager.service";
import {BASE_URL_IMAGES} from "../../../utils/utils";
import {toast} from "react-toastify";
import {getNumberWithSpaces} from "../../../utils/getNumberSpace";
import {converterDate} from "../../../utils/converterDate";
import {useDispatch} from "react-redux";
import moment from "moment";
import {setUser} from "../../../store/slice/userSlice";

const Info = ({userData, isLoadingUser}) => {
    const dispatch = useDispatch()

    const {data, isLoading, isFetching} = useGetDocumentsQuery({login: userData?.id}, {
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true,
        skip: !userData?.id
    })

    const [deleteDocuments, {isLoading: isLoadingDelete}] = useDeleteDocumentsMutation()
    const [verifyUser, {isLoading: isLoadingVeifed}] = useVerifyUserMutation()
    const [currentImg, setCurrentImg] = useState(null)

    const handleDelete = () => {
        deleteDocuments({login: userData.id, img: currentImg}).unwrap().then((res) => {
            toast.success('Документ удален!')
            setCurrentImg(null)
        }).catch(e => {
            console.log('Ошибка')
        })
    }

    const handleVerifed = (e) => {
        verifyUser({login: userData?.id, verified: e.target.value}).unwrap().then((res) => {
            toast.success(e.target.value === 'true' ? 'Пользователь верифицирован' : 'Верификация отменена')
            dispatch(setUser({...userData, verificationDate: e.target.value === 'true' ? moment().format() : null}))
        }).catch(e => {
            toast.error('Ошибка')
        })
    }

    if (!userData) {
        return <Typography variant={'h4'} sx={{textAlign: 'center'}} color={'rgba(0,0,0,0.5)'}>Пользователь не
            найден</Typography>
    }

    return (
        <div className={s.wrapper}>
            <Dialog
                open={currentImg !== null}
                onClose={() => setCurrentImg(null)}
            >
                <DialogContent>
                    <Avatar src={currentImg ? `${BASE_URL_IMAGES}assets/Img/${currentImg}` : null} sx={{
                        height: 'auto',
                        width: '100%',
                        borderRadius: 0
                    }}/>
                </DialogContent>
                <DialogActions>
                    <Button disabled={isLoadingDelete} onClick={() => setCurrentImg(null)}>Закрыть</Button>
                    <Button disabled={isLoadingDelete} color={'error'} onClick={handleDelete}>
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>
            <>
                <div className={s.verf_box}>
                    <Typography variant={'h4'} sx={{
                        marginBottom: '10px',
                        marginTop: '20px'
                    }}>Общая информация</Typography>
                    <FormControl className={s.form}>
                        <FormLabel
                            sx={{
                                color: 'rgba(0, 0, 0, 0.6) !important'
                            }}
                        >{`Верифицировать пользователя (${userData?.login})?`}</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={userData?.verificationDate === null ? false : true}
                            name="radio-buttons-group"
                            onChange={handleVerifed}
                            sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}
                        >
                            {isLoadingVeifed ? <Skeleton variant="rectangular" width={140} height={42}/> : <>
                                <FormControlLabel value={true} control={<Radio/>} label="Да"/>
                                <FormControlLabel value={false} control={<Radio/>} label="Нет"/>
                            </>}
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className={s.content}>

                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>ID</Typography>
                        <Typography variant={'body2'}>{userData?.id || '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>StoreId</Typography>
                        <Typography
                            variant={'body2'}>{userData?.storeId !== null ? userData?.storeId : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>Логин</Typography>
                        <Typography variant={'body2'}>{userData?.login !== null ? userData?.login : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>password</Typography>
                        <Typography
                            variant={'body2'}>{userData?.password !== null ? userData?.password : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>Имя</Typography>
                        <Typography
                            variant={'body2'}>{userData?.firstName !== null ? userData?.firstName : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>Фамилия</Typography>
                        <Typography
                            variant={'body2'}>{userData?.lastName !== null ? userData?.lastName : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>Отчество</Typography>
                        <Typography
                            variant={'body2'}>{userData?.middleName !== null ? userData?.middleName : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>Телефон</Typography>
                        <Typography
                            variant={'body2'}>{userData?.phoneNumber !== null ? userData?.phoneNumber : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>email</Typography>
                        <Typography variant={'body2'}>{userData?.email !== null ? userData?.email : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>telegram </Typography>
                        <Typography
                            variant={'body2'}>{userData?.telegram !== null ? userData?.telegram : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>Логин инвайтера </Typography>
                        <Typography
                            variant={'body2'}>{userData?.inviterLogin !== null ? userData?.inviterLogin : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>Id инвайтера </Typography>
                        <Typography
                            variant={'body2'}>{userData?.inviterId !== null ? userData?.inviterId : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>Дата создания </Typography>
                        <Typography
                            variant={'body2'}>{userData?.creationDate !== null ? converterDate(userData?.creationDate) : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>Верификация </Typography>
                        <Typography
                            variant={'body2'}>{userData?.verificationDate !== null ? converterDate(userData?.verificationDate, true) : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>Активирован </Typography>
                        <Typography variant={'body2'}>{userData?.isActivated === false ? 'Нет' : 'Да'} </Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>Страна </Typography>
                        <Typography
                            variant={'body2'}>{userData?.country !== null ? userData?.country : '---'} </Typography>
                    </div>
                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>Город </Typography>
                        <Typography variant={'body2'}>{userData?.city !== null ? userData?.city : '---'} </Typography>
                    </div>
                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>ConfirmationType </Typography>
                        <Typography
                            variant={'body2'}>{userData?.confirmationType !== null ? userData?.confirmationType : '---'} </Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>rang </Typography>
                        <Typography variant={'body2'}>{userData?.rang !== null ? userData?.rang : '---'} </Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>Посетителей </Typography>
                        <Typography
                            variant={'body2'}>{userData?.visitorsCount !== null ? userData?.visitorsCount : '---'} </Typography>
                    </div>
                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>Аватарка </Typography>
                        <Typography variant={'body2'}>{userData?.image !== null ? userData?.image : '---'} </Typography>
                    </div>
                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>vkontakte </Typography>
                        <Typography
                            variant={'body2'}>{userData?.vkontakte !== null ? userData?.vkontakte : '---'} </Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>OK </Typography>
                        <Typography
                            variant={'body2'}>{userData?.twitter !== null ? userData?.twitter : '---'} </Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
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
                            variant={'body2'}>{userData?.balance !== null ? getNumberWithSpaces(userData?.balance?.toFixed(3)) : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>Баланс бизнес</Typography>
                        <Typography
                            variant={'body2'}>{userData?.balanceBusiness !== null ? getNumberWithSpaces(userData?.balanceBusiness?.toFixed(3)) : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>Баланс Usdc</Typography>
                        <Typography
                            variant={'body2'}>{userData?.balanceUsdc !== null ? getNumberWithSpaces(userData?.balanceUsdc?.toFixed(3)) : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>Баланс Bitcoin</Typography>
                        <Typography
                            variant={'body2'}>{userData?.balanceBitcoin !== null ? getNumberWithSpaces(userData?.balanceBitcoin?.toFixed(3)) : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>Баланс Ethereum</Typography>
                        <Typography
                            variant={'body2'}>{userData?.balanceEthereum !== null ? getNumberWithSpaces(userData?.balanceEthereum?.toFixed(3)) : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>Баланс Litecoin</Typography>
                        <Typography
                            variant={'body2'}>{userData?.balanceLitecoin !== null ? getNumberWithSpaces(userData?.balanceLitecoin?.toFixed(3)) : '---'}</Typography>
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
                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>Серия</Typography>
                        <Typography
                            variant={'body2'}>{userData?.passportSerial !== null ? userData?.passportSerial : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>Кем выдан</Typography>
                        <Typography
                            variant={'body2'}>{userData?.passportIssuer !== null ? userData?.passportIssuer : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_e)}>
                        <Typography variant={'body1'}>Дата выдачи</Typography>
                        <Typography
                            variant={'body2'}>{userData?.passportIssueDate !== null ? converterDate(userData?.passportIssueDate) : '---'}</Typography>
                    </div>
                    <div className={classNames(s.item, s.item_o)}>
                        <Typography variant={'body1'}>Адрес регистрации</Typography>
                        <Typography
                            variant={'body2'}>{userData?.addressReg !== null ? userData?.addressReg : '---'}</Typography>
                    </div>


                </div>
            </>
            {(isFetching || isLoadingDelete) ? <Skeleton variant="rectangular" width={'100%'} height={300}/> :
                <div className={s.documents}>
                    {data?.map((el, ind) => <Avatar onClick={() => setCurrentImg(el)}
                                                    sx={{
                                                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                                                        width: '100%',
                                                        height: '200px',
                                                        borderRadius: '0',
                                                        cursor: 'pointer'
                                                    }} key={ind}
                                                    src={el ? `${BASE_URL_IMAGES}assets/Img/${el}` : null}/>)}
                </div>}

        </div>
    );
};

export default Info;
