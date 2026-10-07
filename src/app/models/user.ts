export type User = {
    id: string;
    email: string;
    name: string;
    imageUrl: string;
}

export type SignUpParams = {
    name: string;
    email: string;
    password: string;
    checkout?: boolean;
    dialogId: string;
}

export type SignInParams = Omit<SignUpParams, 'name'>