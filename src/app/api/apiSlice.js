import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "https://hmsserver-production.up.railway.app/",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        console.log("I am front end getstate auth ",getState().auth)
        console.log("I am front end ",token)
        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 403) {
        console.log(result?.error.data)
        console.log("sending refresh token");
        //getting new access token

        const refreshResult = await baseQuery("/refresh", api, extraOptions);
        if (refreshResult?.data) {
            const user = api.getState().auth.user; // getting username from state
            api.dispatch(setCredentials({ ...refreshResult.data, user }));
            //retry the original query with new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }
    }
    return result;
};

export const apiSlice = createApi({
    baseQuery:baseQueryWithReauth,
    endpoints:builder =>({})
})
