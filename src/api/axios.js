import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {logout} from "../store/slice/authSlice";
import {BASE_URL} from "../utils/utils";

const baseQuery = fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token
        headers.set('Authorization', `Bearer ${token}`)
        return headers;
    }
});

export const baseQueryWithReauth = async (
    args,
    api,
    extraOptions
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        api.dispatch(logout());
    }
    return result;
};
