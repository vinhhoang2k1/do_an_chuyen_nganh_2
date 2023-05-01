import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from '@apps/config/baseQueryWithReauth'
// import { readAccessToken } from '@utils/localStorage'

interface Credentials {
  email: string;
  password: string;
}
interface LoginResponse {
  success: boolean;
  message: string;
  accessToken: string;
}

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['loginApi'],
  endpoints: (build) => ({

    login: build.mutation<LoginResponse, Credentials>({
      query: (credentials: Credentials) => ({
        url: `/auth/login`,
        method: 'POST',
        body: credentials,
      }),
     
      invalidatesTags: ['loginApi'],
    }),
  }),
})

export const {
  useLoginMutation,
} = loginApi
