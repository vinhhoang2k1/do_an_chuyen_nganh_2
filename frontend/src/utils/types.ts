export type authType = {
  user: null | userType
  access_token: null | string
}

export type userType = {
  email: string
  password: string
}
