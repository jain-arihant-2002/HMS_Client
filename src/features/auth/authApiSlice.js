import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth",
                method: "POST",
                body: { ...credentials },
            }),
            invalidatesTags: ['Auth'],
        }),
    }),
});

export const { useLoginMutation } = authApiSlice;
