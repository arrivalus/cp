import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../utils/utils";
import {baseQueryWithReauth} from "../api/axios";

export const managerApi = createApi({
    reducerPath: 'managerApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Documents'],
    endpoints: (build) => ({
        getUser: build.mutation({
            query(payload) {
                return {
                    url: `api/Manage/user-list?login=${payload.login}`,
                    method: 'get',
                }
            }
        }),
        getDocuments: build.query({
            query(payload) {
                return {
                    url: `api/Manage/partner-document-list?partnerId=${payload.login}`,
                    method: 'get',
                }
            },
            providesTags: ['Documents'],
        }),
        deleteDocuments: build.mutation({
            query(payload) {
                return {
                    url: `api/Manage/delete-partner-document?partnerId=${payload.login}&photo=${payload.img}`,
                    method: 'delete',
                }
            },
            invalidatesTags: ['Documents']
        }),
        verifyUser: build.mutation({
            query(payload) {
                return {
                    url: `api/Manage/verify-user?partnerId=${payload.login}&verified=${payload.verified}`,
                    method: 'post',
                }
            },
        }),
        getTable: build.query({
            query(payload) {
                return {
                    url: `api/Manage/transfer-list?partnerId=${payload.partnerId}&pageSize=0&Article=${payload.Article}&CreationDate=${payload.CreationDate}&AccountName=${payload.AccountName}&TransferDirection=${payload.TransferDirection}`,
                    method: 'get',
                }
            },
        }),
        getArticles: build.query({
            query() {
                return {
                    url: `api/Finance/payment-articles`,
                    method: 'get',
                }
            },
        }),
        getAllFinance: build.query({
            query(payload) {
                return {
                    url: `api/Manage/investments?partnerId=${payload.partnerId}&pageSize=0&status=${payload.status}&programCode=${payload.programCode}`,
                    method: 'get',
                }
            },
        }),
        getRequsits: build.query({
            query(payload) {
                return {
                    url: `/api/Manage/user-requisites?partnerId=${payload.partnerId}`,
                    method: 'get',
                }
            },
        }),
    })
})

export const {
    useGetUserMutation,
    useVerifyUserMutation,
    useDeleteDocumentsMutation,
    useGetDocumentsQuery,
    useGetTableQuery,
    useGetArticlesQuery,
    useGetAllFinanceQuery,
    useGetRequsitsQuery,
} = managerApi;
