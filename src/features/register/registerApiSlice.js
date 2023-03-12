import { apiSlice } from "../../app/api/apiSlice";

export const registerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (initialUserData) => ({
                url: "/register",
                method: "POST",
                body: { ...initialUserData },
            }),
        }),
    }),
});

export const { useRegisterUserMutation } = registerApiSlice;
