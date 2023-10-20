import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../utils/utils";
import {baseQueryWithReauth} from "../api/axios";

export const managerApi = createApi({
    reducerPath: 'managerApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (build) => ({
        getUser: build.mutation({
            query(payload) {
                return {
                    url: `api/Manage/user-list?login=${payload.login}`,
                    method: 'get',
                }
            }
        }),
    })
})

export const {
    useGetUserMutation,
} = managerApi;
