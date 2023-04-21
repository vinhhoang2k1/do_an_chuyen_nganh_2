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


export const trainStationApi = createApi({
    reducerPath: 'trainStationApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['trainStationApi'],
    endpoints: (build) => ({
        gettrainStations: build.query<trainStation[], void>({
            query: () => ({
                url: `/trainStations`,
                method: 'GET',
                access_token: readAccessToken(),
            }),
            providesTags: ['trainStationApi'],
        }),

        updatetrainStation: build.mutation({
            query: (trainStationData: trainStation) => ({
                url: `/trainStations/${trainStationData.id}`,
                method: 'PUT',
                body: trainStationData,
                access_token: readAccessToken(),
            }),
            invalidatesTags: ['trainStationApi'],
        }),

        deletetrainStation: build.mutation({
            query: (trainStationId: number) => ({
                url: `/trainStations/${trainStationId}`,
                method: 'DELETE',
                access_token: readAccessToken(),
            }),
            invalidatesTags: ['trainStationApi'],
        }),

        createtrainStation: build.mutation({
            query: (trainStationData: trainStation) => ({
                url: `/trainStations`,
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
} = trainStationApi;