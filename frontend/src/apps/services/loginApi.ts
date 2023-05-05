import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from '@apps/config/baseQueryWithReauth'
// import { readAccessToken } from '@utils/localStorage'
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
interface Credentials {
  email: string;
  password: string;
}
interface LoginResponseSuccess {
  success: boolean;
  message: string;
  accessToken: string;
}



export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['loginApi'],
  endpoints: (build) => ({

    login: build.mutation<LoginResponseSuccess, Credentials>({
      query: (credentials: Credentials) => ({
        url: `/auth/login`,
        method: 'POST',
        body: credentials,
      }),
     
      invalidatesTags: ['loginApi'],
    }),


    register: build.mutation<LoginResponseSuccess, UserData>({
      query: (userData: UserData) => ({
        url: `/auth/register`,
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['loginApi'],
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation
} = loginApi
