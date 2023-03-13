import { apiSlice } from "../../app/api/apiSlice";

export const prescriptionApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["Prescription"],
    endpoints: (builder) => ({
        getPrescriptions: builder.query({
            query: () => ({
                url: "/api/prescription",
            }),
            providesTags: ["Prescription"],
        }),
        createPrescription: builder.mutation({
            query: (initialData) => ({
                url: "/api/prescription",
                method: "POST",
                body: { ...initialData },
            }),
            invalidatesTags: ["Prescription"],
        }),
        updatePrescription: builder.mutation({
            query: (initialData) => ({
                url: "/api/prescription",
                method: "PATCH",
                body: { ...initialData },
            }),
            invalidatesTags: ["Prescription"],
        }),
        deletePrescription: builder.mutation({
            query: (initialData) => ({
                url: "/api/prescription",
                method: "DELETE",
                body: { ...initialData },
            }),
            invalidatesTags: ["Prescription"],
        }),
    }),
});

export const {
    useGetPrescriptionsQuery,
    useCreatePrescriptionMutation,
    useUpdatePrescriptionMutation,
    useDeletePrescriptionMutation,
} = prescriptionApiSlice;
