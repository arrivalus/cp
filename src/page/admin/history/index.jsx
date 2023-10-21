import React, {useCallback, useState} from 'react';
import s from './styles.module.css'
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';
import classNames from "classnames";
import {AgGridReact} from "ag-grid-react";
import {useGetTableQuery} from "../../../store/manager.service";
import {Skeleton} from "@mui/material";
import {converterDate} from "../../../utils/converterDate";
import {getNumberWithSpaces} from "../../../utils/getNumberSpace";

const History = ({userData}) => {
    const {data: table_data, isLoading: isLoadingTable} = useGetTableQuery({login: userData?.login}, {
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true,
        skip: !userData?.id
    })

    console.log(table_data)

    const columnDefs = [
        {
            field: 'paymentDate',
            minWidth: 135,
            headerName: 'Дата операции',
            sortable: false,
            editable: false,
            cellRenderer: (props) => props.value ? converterDate(props.value, true) : '---'
        },
        {
            field: 'partnerLogin',
            headerName: 'Логин',
            minWidth: 105,
            editable: false,
            sortable: false,
        },
        {
            field: 'id',
            minWidth: 65,
            headerName: 'ID',
            sortable: false,
            editable: false,
            cellRenderer: (props) => {
                // console.log(props)
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
            cellRenderer: (props) => {
                return <p className={s.test}>{props.valueFormatted ? props.valueFormatted : props.value}</p>
            }
        },
        {
            field: 'debetSum',
            fieldRender: (props) => {
                console.log(props)
            },
            minWidth: 85,
            headerName: 'Сумма',
            tooltipField: 'debetSum',
            editable: false,
            cellRenderer: (props) => {
                console.log(props?.data)
                return props?.data?.creditSum === null ? getNumberWithSpaces(props?.data?.debetSum.toFixed(3)) : `-${getNumberWithSpaces(props?.data?.creditSum.toFixed(3))}`
            }
        },
        {
            field: 'accountName',
            minWidth: 85,
            headerName: 'Счет',
            tooltipField: 'accountName',
            sortable: false,
            editable: false,
            cellRenderer: (props) => props.valueFormatted ? props.valueFormatted : props.value
        },
        {
            field: 'accountBalance',
            minWidth: 105,
            headerName: 'Баланс',
            editable: false,
            cellRenderer: (props) => {
                return props.value ? getNumberWithSpaces(props.value.toFixed(3)) : '---'
            }
        },
    ];

    if (isLoadingTable || table_data === undefined) {
        return <Skeleton variant="rectangular" width={'100%'} height={500}/>
    }

    return (
        <div style={{width: '100%'}}>
            <div className={classNames(s.table, 'ag-theme-alpine')} style={{width: '100%', height: 500}}>
                <AgGridReact
                    enableBrowserTooltips={true}
                    tooltipShowDelay={0}
                    tooltipHideDelay={500}
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
            </div>
        </div>
    );
};

export default History;
