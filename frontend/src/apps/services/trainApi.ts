import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from '@apps/config/baseQueryWithReauth'
import { readAccessToken } from '@utils/localStorage'

interface Train {
    id: number;
    trainNumber: string;
    seatsNumber: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}
interface Response {
    success: boolean;
    message: string;
    results: number;
    trains: Train[];
}
interface ResponseOne {
    success: boolean;
    message: string;
    train: Train[];
}


export const trainApi = createApi({
    reducerPath: 'trainApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['trainApi'],
    endpoints: (build) => ({

        updatetrain: build.mutation({
            query: (trainData: Train) => ({
                url: `/train/${trainData.id}`,
                method: 'PUT',
                body: trainData,
                access_token: readAccessToken(),
            }),
            invalidatesTags: ['trainApi'],
        }),

        deletetrain: build.mutation({
            query: (trainId: number) => ({
                url: `/train/${trainId}`,
                method: 'DELETE',
                access_token: readAccessToken(),
            }),
            invalidatesTags: ['trainApi'],
        }),

        createtrain: build.mutation({
            query: (trainData: Train) => ({
                url: `/train`,
                method: 'POST',
                body: trainData,
                access_token: readAccessToken(),
            }),
            invalidatesTags: ['trainApi'],
        }),

        gettrains: build.query<Response, void>({
            query: () => ({
                url: `/train`,
                method: 'GET',
                access_token: readAccessToken(),
            }),
            providesTags: ['trainApi'],
        }),


        gettrain: build.query<ResponseOne, number>({
            query: (trainId:number) => ({
                url: `/train/${trainId}`,
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
    useGettrainsQuery,
    useGettrainQuery
} = trainApi;
