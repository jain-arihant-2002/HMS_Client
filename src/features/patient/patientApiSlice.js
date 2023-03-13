import { apiSlice } from "../../app/api/apiSlice";

export const patientApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["Patient"],
    endpoints: (builder) => ({
        getPatients: builder.query({
            query: () => ({
                url: "/api/patient",
            }),
            providesTags: ["Patient"],
        }),
        registerPatient: builder.mutation({
            query: (initialPatientData) => ({
                url: "/api/patient",
                method: "POST",
                body: { ...initialPatientData },
            }),
            invalidatesTags: ["Patient"],
        }),
        updatePatient: builder.mutation({
            query: (initialData) => ({
                url: "/api/patient",
                method: "PATCH",
                body: { ...initialData },
            }),
            invalidatesTags: ["Patient"],
        }),
        deletePatient: builder.mutation({
            query: (initialData) => ({
                url: "/api/patient",
                method: "DELETE",
                body: { ...initialData },
            }),
            invalidatesTags: ["Patient"],
        }),
    }),
});

export const {
    useGetPatientsQuery,
    useRegisterPatientMutation,
    useUpdatePatientMutation,
    useDeletePatientMutation,
} = patientApiSlice;
