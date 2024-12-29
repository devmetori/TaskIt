export interface SigninSchema {
    email: string;
    password: string;
}

export interface SignupSchema extends SigninSchema {
    name: string;
    surname: string;
}
