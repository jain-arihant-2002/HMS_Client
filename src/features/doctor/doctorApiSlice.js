import { apiSlice } from "../../app/api/apiSlice";

export const doctorApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["Doctor"],
    endpoints: (builder) => ({
        getDoctors: builder.query({
            query: () => ({
                url: "/api/doctor",
            }),
            providesTags: ["Doctor"],
        }),
        createDoctor: builder.mutation({
            query: (initialData) => ({
                url: "/api/doctor",
                method: "POST",
                body: { ...initialData },
            }),
            invalidatesTags: ["Doctor"],
        }),
        updateDoctor: builder.mutation({
            query: (initialData) => ({
                url: "/api/doctor",
                method: "PATCH",
                body: { ...initialData },
            }),
            invalidatesTags: ["Doctor"],
        }),
        deleteDoctor: builder.mutation({
            query: (initialData) => ({
                url: "/api/doctor",
                method: "DELETE",
                body: { ...initialData },
            }),
            invalidatesTags: ["Doctor"],
        }),
    }),
});

export const {
    useGetDoctorsQuery,
    useCreateDoctorMutation,
    useUpdateDoctorMutation,
    useDeleteDoctorMutation,
} = doctorApiSlice;
