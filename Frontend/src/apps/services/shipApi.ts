import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from '@apps/config/baseQueryWithReauth'
import { readAccessToken } from '@utils/localStorage'

interface TrainSeat {
    id: number;
    number: string;
    seatNumber: number;
    status: string;
    routeId:number
}
export const shipApi = createApi({
    reducerPath: 'shipApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['shipApi'],
    endpoints: (build) => ({

        updateShip: build.mutation({
            query: (shipData: TrainSeat) => ({
                url: `/ships/${shipData.id}`,
                method: 'PUT',
                body: shipData,
                access_token: readAccessToken(),
            }),
            invalidatesTags: ['shipApi'],
        }),

        deleteShip: build.mutation({
            query: (shipId: number) => ({
                url: `/ships/${shipId}`,
                method: 'DELETE',
                access_token: readAccessToken(),
            }),
            invalidatesTags: ['shipApi'],
        }),

        createShip: build.mutation({
            query: (shipData: TrainSeat) => ({
                url: `/ships`,
                method: 'POST',
                body: shipData,
                access_token: readAccessToken(),
            }),
            invalidatesTags: ['shipApi'],
        }),

        getShips: build.query<TrainSeat[], void>({
            query: () => ({
                url: `/ships`,
                method: 'GET',
                access_token: readAccessToken(),
            }),
            providesTags: ['shipApi'],
        }),
    }),
})

export const {
    useUpdateShipMutation,
    useDeleteShipMutation,
    useCreateShipMutation,
    useGetShipsQuery
} = shipApi;
