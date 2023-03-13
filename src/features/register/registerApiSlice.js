import { apiSlice } from "../../app/api/apiSlice";

export const registerApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["User"],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (initialUserData) => ({
                url: "/register",
                method: "POST",
                body: { ...initialUserData },
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const { useRegisterUserMutation } = registerApiSlice;
