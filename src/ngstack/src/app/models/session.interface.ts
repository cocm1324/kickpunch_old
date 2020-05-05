import { IUser } from '.';
import { IResponse } from './common.interface';

export interface ILoginReq {
    email: string;
    password: string;
}

export interface ILoginRes extends IResponse {
    response?: {
        token: string;
        userInfo: IUser;
    }
}

export interface IRegisterReq {
    name: string;
    email: string;
    password: string;
}

export interface IRegisterRes extends IResponse {
    response?: {
        token: string;
        userInfo: IUser;
    }
}

export interface ISessionVerifyReq {
    userName: string;
}