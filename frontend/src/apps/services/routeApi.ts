import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from '@apps/config/baseQueryWithReauth'
import { readAccessToken } from '@utils/localStorage'

interface TrainRoute {
    id:number,
    start: string;
    time: number;
    to: string;
    description: string;
  }
  

export const routeApi = createApi({
    reducerPath: 'routeApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['routeApi'],
    endpoints: (build) => ({
        getRoutes: build.query<TrainRoute[],void>({
            query: () => ({
                url: `/routes`,
                method: 'GET',
                access_token: readAccessToken(),
            }),
            providesTags: ['routeApi'],
        }),

        updateRoute: build.mutation({
            query: (routeData:TrainRoute) => ({
                url: `/routes/${routeData.id}`,
                method: 'PUT',
                body: routeData,
                access_token: readAccessToken(),
            }),
            invalidatesTags: ['routeApi'],
        }),

        deleteRoute: build.mutation({
            query: (routeId:number) => ({
                url: `/routes/${routeId}`,
                method: 'DELETE',
                access_token: readAccessToken(),
            }),
            invalidatesTags: ['routeApi'],
        }),

        createRoute: build.mutation({
            query: (routeData:TrainRoute) => ({
                url: `/routes`,
                method: 'POST',
                body: routeData,
                access_token: readAccessToken(),
            }),
            invalidatesTags: ['routeApi'],
        }),

    }),
})

export const {
    useGetRoutesQuery,
    useUpdateRouteMutation,
    useDeleteRouteMutation,
    useCreateRouteMutation,
} = routeApi;
