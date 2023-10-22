import React, {useCallback, useRef, useState} from 'react';
import s from './styles.module.css'
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';
import classNames from "classnames";
import {AgGridReact} from "ag-grid-react";
import {useGetTableQuery} from "../../../store/manager.service";
import {Pagination, Skeleton} from "@mui/material";
import {converterDate} from "../../../utils/converterDate";
import {getNumberWithSpaces} from "../../../utils/getNumberSpace";
import {toast} from "react-toastify";

const History = ({userData}) => {
    const gridRef = useRef()
    const {data: table_data, isLoading: isLoadingTable} = useGetTableQuery({login: userData?.login}, {
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

    if (isLoadingTable || table_data === undefined) {
        return <Skeleton variant="rectangular" width={'100%'} height={500}/>
    }

    console.log(Math.ceil(table_data?.totalCount / 20))

    return (
        <div style={{width: '100%'}}>
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
            </div>

        </div>
    );
};

export default History;
