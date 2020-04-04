import { IUser } from '.';

export interface ILoginReq {
    email: string;
    password: string;
}

export interface ILoginRes {
    RESULT?: number;
    response?: {
        token: string;
        userInfo: IUser;
    }
}

export interface IRegisterReq {
    email: string;
    password: string;
}

export interface IRegisterRes {
    RESULT?: number;
    response?: {
        token: string;
        userInfo: IUser;
    }
}