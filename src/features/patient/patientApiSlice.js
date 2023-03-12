import { apiSlice } from "../../app/api/apiSlice";

export const patientApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registerPatient: builder.mutation({
            query: (initialPatientData) => ({
                url: "/api/patient",
                method: "POST",
                body: { ...initialPatientData },
            }),
        }),
        getPatients: builder.query({
            query: () => ({
                url: "/api/patient",
            }),
        }),
    }),
});

export const { useRegisterPatientMutation,useGetPatientsQuery } = patientApiSlice;
