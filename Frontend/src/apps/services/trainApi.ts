import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from '@apps/config/baseQueryWithReauth'
import { readAccessToken } from '@utils/localStorage'

interface trainData {
    id: number;
    trainNumber: string;
    seatsNumber: number;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export const trainApi = createApi({
    reducerPath: 'trainApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['trainApi'],
    endpoints: (build) => ({

        updatetrain: build.mutation({
            query: (trainData: trainData) => ({
                url: `/trains/${trainData.id}`,
                method: 'PUT',
                body: trainData,
                access_token: readAccessToken(),
            }),
            invalidatesTags: ['trainApi'],
        }),

        deletetrain: build.mutation({
            query: (trainId: number) => ({
                url: `/trains/${trainId}`,
                method: 'DELETE',
                access_token: readAccessToken(),
            }),
            invalidatesTags: ['trainApi'],
        }),

        createtrain: build.mutation({
            query: (trainData: trainData) => ({
                url: `/trains`,
                method: 'POST',
                body: trainData,
                access_token: readAccessToken(),
            }),
            invalidatesTags: ['trainApi'],
        }),

        gettrains: build.query<trainData[], void>({
            query: () => ({
                url: `/trains`,
                method: 'GET',
                access_token: readAccessToken(),
            }),
            providesTags: ['trainApi'],
        }),
    }),
})

export const {
    useUpdatetrainMutation,
    useDeletetrainMutation,
    useCreatetrainMutation,
    useGettrainsQuery
} = trainApi;
