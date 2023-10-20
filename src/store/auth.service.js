import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../utils/utils";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    endpoints: (build) => ({
        login: build.mutation({
            query({loginOrEmail, password, code}) {
                return {
                    url: 'api/Auth/login',
                    method: 'post',
                    body: {loginOrEmail, password, code}
                }
            }
        }),
    })
})

export const {
    useLoginMutation,
} = authApi;
