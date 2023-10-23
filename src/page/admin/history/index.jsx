import React, {useCallback, useRef, useState} from 'react';
import s from './styles.module.css'
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';
import classNames from "classnames";
import {AgGridReact} from "ag-grid-react";
import {useGetArticlesQuery, useGetTableQuery} from "../../../store/manager.service";
import {Button, FormControl, InputLabel, MenuItem, Pagination, Select, Skeleton} from "@mui/material";
import {converterDate} from "../../../utils/converterDate";
import {getNumberWithSpaces} from "../../../utils/getNumberSpace";
import {toast} from "react-toastify";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

const History = ({userData, value}) => {
    const gridRef = useRef()
    const [values, setValues] = useState({
        from: moment('01/01/2019'),
        to: moment(),
        Article: '',
        AccountName: 'all',
        TransferDirection: 'all',
    })

    const {data: table_data, isLoading: isLoadingTable, isFetching} = useGetTableQuery({
        login: userData?.login,
        Article: values.Article,
        CreationDate: `${moment(values.from).valueOf()}-${moment(values.to).valueOf()}`,
        AccountName: values.AccountName === 'all' ? '' : values.AccountName,
        TransferDirection: values.TransferDirection === 'all' ? '' : values.TransferDirection,
    }, {
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true,
        skip: !userData?.id
    })
    const {data: article_data, isLoading: isLoadingArticle} = useGetArticlesQuery()

    const handleClickCell = async (data) => {
        await navigator.clipboard.writeText(data)
        toast.success('Скопировано в буфер обмена')
    }

    const columnDefs = [
        {
            field: 'paymentDate',
            minWidth: 135,
            headerName: 'Дата операции',
            sortable: false,
            editable: false,
            onCellClicked: (props) => handleClickCell(props.value),
            cellRenderer: (props) => props.value ? converterDate(props.value, true) : '---'
        },
        {
            field: 'partnerLogin',
            headerName: 'Логин',
            minWidth: 105,
            onCellClicked: (props) => handleClickCell(props.value),
            editable: false,
            sortable: false,
        },
        {
            field: 'id',
            minWidth: 65,
            headerName: 'ID',
            sortable: false,
            editable: false,
            onCellClicked: (props) => handleClickCell(props.value),
            cellRenderer: (props) => {
                return props.valueFormatted ? props.valueFormatted : props.value
            }
        },
        {
            field: 'paymentArticle',
            minWidth: 125,
            headerName: 'Статья',
            sortable: false,
            wrapText: true,
            autoHeight: true,
            editable: false,
            onCellClicked: (props) => handleClickCell(props.value),
            cellRenderer: (props) => {
                return <p className={s.test}>{props.valueFormatted ? props.valueFormatted : props.value}</p>
            }
        },
        {
            field: 'objectName',
            minWidth: 175,
            headerName: 'Назначение',
            flex: 2.1,
            wrapText: true,
            autoHeight: true,
            sortable: false,
            editable: false,
            onCellClicked: (props) => handleClickCell(props.value),
            cellRenderer: (props) => {
                return <p className={s.test}>{props.valueFormatted ? props.valueFormatted : props.value}</p>
            }
        },
        {
            field: 'debetSum',
            minWidth: 85,
            headerName: 'Сумма',
            tooltipValueGetter: (props) => {
                return props?.data?.creditSum === null ? props?.data?.debetSum : `-${props?.data?.creditSum}`
            },
            editable: false,
            onCellClicked: (props) => handleClickCell(props?.data?.creditSum === null ? props?.data?.debetSum : `-${props?.data?.creditSum}`),
            cellRenderer: (props) => {
                return props?.data?.creditSum === null ? getNumberWithSpaces(props?.data?.debetSum.toFixed(3)) : `-${getNumberWithSpaces(props?.data?.creditSum.toFixed(3))}`
            }
        },
        {
            field: 'accountName',
            minWidth: 85,
            headerName: 'Счет',
            sortable: false,
            editable: false,
            onCellClicked: (props) => handleClickCell(props.value),
            cellRenderer: (props) => props.valueFormatted ? props.valueFormatted : props.value
        },
        {
            field: 'accountBalance',
            minWidth: 105,
            headerName: 'Баланс',
            tooltipField: 'accountBalance',
            editable: false,
            onCellClicked: (props) => handleClickCell(props.value),
            cellRenderer: (props) => {
                return props.value ? getNumberWithSpaces(props.value.toFixed(3)) : '---'
            }
        },
    ];

    return (
        <div style={{width: '100%'}}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <div className={s.actions}>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Счет</InputLabel>
                        <Select
                            value={values.AccountName}
                            label="Счет"
                            onChange={(e) => {
                                setValues({...values, AccountName: e.target.value})
                            }}
                        >
                            <MenuItem value={'all'}>Все</MenuItem>
                            <MenuItem value={'Inner'}>USDT</MenuItem>
                            <MenuItem value={'Business'}>Business</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Статья</InputLabel>
                        <Select
                            disabled={isLoadingArticle}
                            value={values.Article}
                            label="Статья"
                            onChange={(e) => {
                                setValues({...values, Article: e.target.value})
                            }}
                        >
                            {article_data?.map((el) => <MenuItem value={el}>{el}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Направление</InputLabel>
                        <Select
                            value={values.TransferDirection}
                            label="Направление"
                            onChange={(e) => {
                                setValues({...values, TransferDirection: e.target.value})
                            }}
                        >
                            <MenuItem value={'all'}>Все</MenuItem>
                            <MenuItem value={0}>Приход</MenuItem>
                            <MenuItem value={1}>Расход</MenuItem>
                        </Select>
                    </FormControl>
                    <DatePicker
                        format={'MM.DD.YYYY'}
                        label="Дата от"
                        value={values.from}
                        onChange={(newValue) => setValues({...values, from: newValue})}
                    />
                    <DatePicker
                        format={'MM.DD.YYYY'}
                        label="Дата до"
                        value={values.to}
                        onChange={(newValue) => setValues({...values, to: newValue})}
                    />

                    <Button variant="outlined" disabled={true}
                            sx={{color: 'rgba(0, 0, 0, 0.8) !important'}}>{`Найдено ${isFetching ? '---' : (table_data?.totalCount || 0)} операций`}</Button>
                </div>
            </LocalizationProvider>
            {isFetching ? <Skeleton variant="rectangular" width={'100%'} height={600}/> :
                <div className={classNames(s.table, 'ag-theme-alpine')} style={{width: '100%', height: 600}}>
                    <AgGridReact
                        ref={gridRef}
                        enableBrowserTooltips={true}
                        tooltipShowDelay={0}
                        tooltipHideDelay={0}
                        getRowStyle={(params) => {
                            if (params.data.creditSum) {
                                return {background: 'rgba(232,68,68,0.3)'};
                            }
                        }}
                        localeText={{
                            "to": '-',
                            "of": 'из',
                            "page": 'страница',
                            "Rows": "Нет данных"
                        }}
                        paginationPageSize={20}
                        // viewportRowModelPageSize={20}
                        pagination={true}
                        columnDefs={columnDefs}
                        // rowHeight={120}
                        rowData={table_data?.items || []}
                        style={{height: '100%', width: '100%'}}
                        defaultColDef={{
                            editable: true,
                            sortable: true,
                            flex: 1,
                            minWidth: 20,
                            filter: false,
                            floatingFilter: false,
                            resizable: true,
                            menuTabs: false,
                        }}
                    />
                    <div className={s.pagination}>
                        <Pagination count={Math.ceil(table_data?.totalCount / 20)} color="primary" onChange={(e, v) => {
                            gridRef?.current?.api?.paginationGoToPage(Number(v - 1))
                        }}/>
                    </div>
                </div>}
        </div>
    );
};

export default History;
