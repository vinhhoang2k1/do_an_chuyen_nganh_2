import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from '@apps/config/baseQueryWithReauth'
import { readAccessToken } from '@utils/localStorage'

interface ScheduleData {
    id: number;
    trainId: number;
    startStationId: number;
    endStationId: number;
    timeStart: Date;
    timeRunning: number;
    timeBreak: number;
    createdAt: Date;
    updatedAt: Date;
}
interface Response {
    success: boolean;
    message: string;
    results: number;
    schedules: ScheduleData[];
}

interface ResponseOne {
    success: boolean;
    message: string;
    results: number;
    schedule: ScheduleData[];
}

export const scheduleApi = createApi({
    reducerPath: 'scheduleApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['scheduleApi'],
    endpoints: (build) => ({

        deleteSchedule: build.mutation({
            query: (scheduleId: number) => ({
                url: `/schedule/${scheduleId}`,
                method: 'DELETE',
                access_token: readAccessToken(),
            }),
            invalidatesTags: ['scheduleApi'],
        }),

        createSchedule: build.mutation({
            query: (scheduleData: ScheduleData) => ({
                url: `/schedule`,
                method: 'POST',
                body: scheduleData,
                access_token: readAccessToken(),
            }),
            invalidatesTags: ['scheduleApi'],
        }),

        getSchedules: build.query<Response, void>({
            query: () => ({
                url: `/schedule`,
                method: 'GET',
                access_token: readAccessToken(),
            }),
            providesTags: ['scheduleApi'],
        }),

        getSchedule: build.query<ResponseOne, number>({
            query: (scheduleId:number) => ({
                url: `/schedule/${scheduleId}`,
                method: 'GET',
                access_token: readAccessToken(),
            }),
            providesTags: ['scheduleApi'],
        }),

        updateSchedule: build.mutation({
            query: (scheduleData: ScheduleData) => ({
                url: `/train-station/${scheduleData.id}`,
                method: 'PUT',
                body: scheduleData,
                access_token: readAccessToken(),
            }),
            invalidatesTags: ['scheduleApi'],
        }),

    }),
})

export const {
    useDeleteScheduleMutation,
    useCreateScheduleMutation,
    useGetSchedulesQuery,
    useGetScheduleQuery,
    useUpdateScheduleMutation
} = scheduleApi;