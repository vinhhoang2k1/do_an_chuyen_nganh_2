import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from '@apps/config/baseQueryWithReauth'
import { readAccessToken } from '@utils/localStorage'

interface trainStation {
    id: number;
    stationName: string;
    stationPlace: string;
    createdAt: Date;
    updatedAt: Date;
}
interface Response {
    success: boolean;
    message: string;
    results: number;
    trains: trainStation[];
}
interface ResponseOne {
    success: boolean;
    message: string;
    trainStation: trainStation[];
}


export const trainStationApi = createApi({
    reducerPath: 'trainStationApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['trainStationApi'],
    endpoints: (build) => ({
        gettrainStations: build.query<Response, void>({
            query: () => ({
                url: `/train-station`,
                method: 'GET',
                access_token: readAccessToken(),
            }),
            providesTags: ['trainStationApi'],
        }),

        gettrainStation: build.query<ResponseOne, number>({
            query: (stationId:number) => ({
                url: `/train-station/${stationId}`,
                method: 'GET',
                access_token: readAccessToken(),
            }),
            providesTags: ['trainStationApi'],
        }),

        updatetrainStation: build.mutation({
            query: (trainStationData: trainStation) => ({
                url: `/train-station/${trainStationData.id}`,
                method: 'PUT',
                body: trainStationData,
                access_token: readAccessToken(),
            }),
            invalidatesTags: ['trainStationApi'],
        }),

        deletetrainStation: build.mutation({
            query: (trainStationId: number) => ({
                url: `/train-station/${trainStationId}`,
                method: 'DELETE',
                access_token: readAccessToken(),
            }),
            invalidatesTags: ['trainStationApi'],
        }),

        createtrainStation: build.mutation({
            query: (trainStationData: trainStation) => ({
                url: `/train-station`,
                method: 'POST',
                body: trainStationData,
                access_token: readAccessToken(),
            }),
            invalidatesTags: ['trainStationApi'],
        }),

    }),
})

export const {
    useGettrainStationsQuery,
    useUpdatetrainStationMutation,
    useDeletetrainStationMutation,
    useCreatetrainStationMutation,
    useGettrainStationQuery
} = trainStationApi;
