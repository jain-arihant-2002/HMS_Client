import { apiSlice } from "../../app/api/apiSlice";

export const patientApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registerPatient: builder.mutation({
            query: (initialPatientData) => ({
                url: "/patient",
                method: "POST",
                body: { ...initialPatientData },
            }),
        }),
    }),
});

export const { useRegisterPatientMutation } = patientApiSlice;
