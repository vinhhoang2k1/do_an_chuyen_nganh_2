import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from '@apps/config/baseQueryWithReauth'
import { readAccessToken } from '@utils/localStorage'

export const scheduleApi = createApi({
    reducerPath: 'scheduleApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['scheduleApi'],
    endpoints: (build) => ({

        deleteSchedule: build.mutation({
            query: (scheduleId) => ({
                url: `/schedules/${scheduleId}`,
                method: 'DELETE',
                access_token: readAccessToken(),
            }),
            invalidatesTags: ['scheduleApi'],
        }),

        createSchedule: build.mutation({
            query: (scheduleData) => ({
                url: `/schedules`,
                method: 'POST',
                body: scheduleData,
                access_token: readAccessToken(),
            }),
            invalidatesTags: ['scheduleApi'],
        }),

        getSchedules: build.query({
            query: () => ({
                url: `/schedules`,
                method: 'GET',
                access_token: readAccessToken(),
            }),
            providesTags: ['scheduleApi'],
        }),

    }),
})

export const {
    useDeleteScheduleMutation,
    useCreateScheduleMutation,
    useGetSchedulesQuery
} = scheduleApi;