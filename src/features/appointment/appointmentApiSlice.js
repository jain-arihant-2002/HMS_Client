import { apiSlice } from "../../app/api/apiSlice";

export const appointmentApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["Appointment"],
    endpoints: (builder) => ({
        getAppointments: builder.query({
            query: () => ({
                url: "/api/appointment",
            }),
            providesTags: ["Appointment"],
        }),
        createAppointment: builder.mutation({
            query: (initialData) => ({
                url: "/api/appointment",
                method: "POST",
                body: { ...initialData },
            }),
            invalidatesTags: ["Appointment"],
        }),
        updateAppointment: builder.mutation({
            query: (initialData) => ({
                url: "/api/appointment",
                method: "PATCH",
                body: { ...initialData },
            }),
            invalidatesTags: ["Appointment"],
        }),
        deleteAppointment: builder.mutation({
            query: (initialData) => ({
                url: "/api/appointment",
                method: "DELETE",
                body: { ...initialData },
            }),
            invalidatesTags: ["Appointment"],
        }),
    }),
});

export const {
    useGetAppointmentsQuery,
    useCreateAppointmentMutation,
    useUpdateAppointmentMutation,
    useDeleteAppointmentMutation,
} = appointmentApiSlice;
