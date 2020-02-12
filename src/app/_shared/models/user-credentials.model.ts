export interface UserLoginCredentials {
    email: string,
    password: string,
}

export interface UserRegisterCredentials {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    registryCode: string,
    phoneNumber ?: string
}
