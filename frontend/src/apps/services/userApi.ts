import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from '@apps/config/baseQueryWithReauth'
import { readAccessToken } from '@utils/localStorage'

interface UserData {
  id: number;
  fullName: string;
  cccdNumber: number;
  email: string;
  password: string;
  phoneNumber: number;
  department: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}
interface Response {
  success: boolean;
  message: string;
  results: number;
  admins: UserData[];
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['userApi'],
  endpoints: (build) => ({
    updateUser: build.mutation({
      query: (userData: UserData) => ({
        url: `/user/${userData.id}`,
        method: 'PUT',
        body: userData,
        access_token: readAccessToken(),
      }),
      invalidatesTags: ['userApi'],
    }),

    deleteUser: build.mutation({
      query: (userId: number) => ({
        url: `/user/${userId}`,
        method: 'DELETE',
        access_token: readAccessToken(),
      }),
      invalidatesTags: ['userApi'],
    }),

    createUser: build.mutation({
      query: (userData: UserData) => ({
        url: `/auth/register`,
        method: 'POST',
        body: userData,
        access_token: readAccessToken(),
      }),
      invalidatesTags: ['userApi'],
    }),

    getUsers: build.query<Response, void>({
      query: () => ({
        url: `/auth/list`,
        method: 'GET',
        access_token: readAccessToken(),
      }),
      providesTags: ['userApi'],
    }),
  }),
})

export const { 
  useGetUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation 
} = userApi
