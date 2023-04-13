import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from '@apps/config/baseQueryWithReauth'
import { readAccessToken } from '@utils/localStorage'

interface ScheduleData {
    trainCode: string;
    routeCode: string;
    time: Date;
}

export const scheduleApi = createApi({
    reducerPath: 'scheduleApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['scheduleApi'],
    endpoints: (build) => ({

        deleteSchedule: build.mutation({
            query: (scheduleId: number) => ({
                url: `/schedules/${scheduleId}`,
                method: 'DELETE',
                access_token: readAccessToken(),
            }),
            invalidatesTags: ['scheduleApi'],
        }),

        createSchedule: build.mutation({
            query: (scheduleData: ScheduleData) => ({
                url: `/schedules`,
                method: 'POST',
                body: scheduleData,
                access_token: readAccessToken(),
            }),
            invalidatesTags: ['scheduleApi'],
        }),

        getSchedules: build.query<ScheduleData[], void>({
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