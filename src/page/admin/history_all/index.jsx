import React, {useRef, useState} from 'react';
import {useGetAllFinanceQuery} from "../../../store/manager.service";
import {Button, FormControl, InputLabel, MenuItem, Pagination, Select, Skeleton} from "@mui/material";
import classNames from "classnames";
import s from "../history/styles.module.css";
import {AgGridReact} from "ag-grid-react";
import {converterDate} from "../../../utils/converterDate";
import {getNumberWithSpaces} from "../../../utils/getNumberSpace";
import {toast} from "react-toastify";

const HistoryAll = ({userData}) => {
    const gridRef = useRef()
    const [values, setValues] = useState({
        status: '',
        programCode: ''
    })
    const {data, isLoading, isFetching} = useGetAllFinanceQuery({
        partnerId: userData?.id,
        status: values.status === 'all' ? '' : values.status,
        programCode: values.programCode === 'all' ? '' : values.programCode,
    }, {
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true,
        skip: !userData?.id
    })

    const handleClickCell = async (data) => {
        await navigator.clipboard.writeText(data)
        toast.success('Скопировано в буфер обмена')
    }

    const columnDefs = [
        {
            field: 'id',
            minWidth: 75,
            headerName: 'ID',
            sortable: false,
            editable: false,
            onCellClicked: (props) => handleClickCell(props.value),
            cellRenderer: (props) => props.value || '---'
        },
        {
            field: 'programName',
            minWidth: 135,
            headerName: 'Портфель',
            sortable: false,
            editable: false,
            onCellClicked: (props) => handleClickCell(props.value),
            cellRenderer: (props) => props.value || '---'
        },
        {
            field: 'status',
            minWidth: 135,
            headerName: 'Статус',
            sortable: false,
            editable: false,
            onCellClicked: (props) => handleClickCell(props.value),
            cellRenderer: (props) => props.value || '---'
        },
        {
            field: 'startDate',
            minWidth: 135,
            headerName: 'Оформлен',
            sortable: false,
            editable: false,
            onCellClicked: (props) => handleClickCell(props.value),
            cellRenderer: (props) => props.value ? converterDate(props.value, true) : '---'
        },
        {
            field: 'endDate',
            minWidth: 135,
            headerName: 'Завершен',
            sortable: false,
            editable: false,
            onCellClicked: (props) => handleClickCell(props.value),
            cellRenderer: (props) => props.value ? converterDate(props.value, true) : '---'
        },
        {
            field: 'sum',
            minWidth: 135,
            headerName: 'Сумма',
            sortable: false,
            editable: false,
            onCellClicked: (props) => handleClickCell(props.value),
            cellRenderer: (props) => props.value ? getNumberWithSpaces(props.value.toFixed(2)) : '---'
        },
        {
            field: 'insuranceEndDate',
            minWidth: 135,
            headerName: 'Страховка',
            sortable: false,
            editable: false,
            onCellClicked: (props) => handleClickCell(props.value),
            cellRenderer: (props) => props.value ? converterDate(props.value) : '---'
        },
        {
            field: 'speedPercent',
            minWidth: 135,
            headerName: 'Автоматизация',
            tooltipValueGetter: (props) => {
                return props?.data?.speedEndDate === null ? '' : `до ${converterDate(props?.data?.speedEndDate)}`
            },
            sortable: false,
            editable: false,
            onCellClicked: (props) => handleClickCell(props.value),
            cellRenderer: (props) => props.value !== 0 ? `${props.value * 100}%` : '---'
        },
    ];

    const sum_filter = data?.items.filter((f) => f.sum !== null)
    const sum = sum_filter.reduce((acc, inc) => acc = acc + inc?.sum, 0)
    console.log(sum)
    return (
        <div style={{width: '100%'}}>
            <div className={s.actions}>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Статус</InputLabel>
                    <Select
                        value={values.status}
                        label="Статус"
                        onChange={(e) => {
                            setValues({...values, status: e.target.value})
                        }}
                    >
                        <MenuItem value={'all'}>Все</MenuItem>
                        <MenuItem value={'Активен'}>Активен</MenuItem>
                        <MenuItem value={'Завершен'}>Завершен</MenuItem>
                        <MenuItem value={'Реинвестирован'}>Реинвестирован</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Название</InputLabel>
                    <Select
                        value={values.programCode}
                        label="Название"
                        onChange={(e) => {
                            setValues({...values, programCode: e.target.value})
                        }}
                    >
                        <MenuItem value={'all'}>Все</MenuItem>
                        <MenuItem value={'conservative'}>Консервативный</MenuItem>
                        <MenuItem value={'moderate'}>Умеренный</MenuItem>
                        <MenuItem value={'agressive'}>Агрессивный</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="outlined" disabled={true}
                        sx={{color: 'rgba(0, 0, 0, 0.8) !important'}}>
                    <p>{`Найдено ${isFetching ? '---' : (data?.totalCount || 0)} портфелей на сумму ${isFetching ? '---' : getNumberWithSpaces(sum?.toFixed(2))}$`}</p>
                </Button>

            </div>
            {isFetching ? <Skeleton variant="rectangular" width={'100%'} height={600}/> :
                <div className={classNames(s.table, 'ag-theme-alpine')} style={{width: '100%', height: 600}}>
                    <AgGridReact
                        ref={gridRef}
                        enableBrowserTooltips={true}
                        tooltipShowDelay={0}
                        tooltipHideDelay={0}
                        getRowStyle={(params) => {
                            if (params.data.endDate !== null) {
                                return {background: 'rgba(232,68,68,0.3)'};
                            } else if (params.data.isPromo) {
                                return {background: 'rgba(243,236,107,0.3)'};
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
                        rowData={data?.items || []}
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
                        <Pagination count={Math.ceil(data?.totalCount / 20)} color="primary" onChange={(e, v) => {
                            gridRef?.current?.api?.paginationGoToPage(Number(v - 1))
                        }}/>
                    </div>
                </div>}
        </div>
    );
};

export default HistoryAll;
