import { apiSlice } from "../../app/api/apiSlice";

export const patientApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["Patient"],
    endpoints: (builder) => ({
        registerPatient: builder.mutation({
            query: (initialPatientData) => ({
                url: "/api/patient",
                method: "POST",
                body: { ...initialPatientData },
            }),
            invalidatesTags: ["Patient"],
        }),
        getPatients: builder.query({
            query: () => ({
                url: "/api/patient",
            }),
            providesTags: ["Patient"],
        }),
    }),
});

export const { useRegisterPatientMutation, useGetPatientsQuery } = patientApiSlice;
