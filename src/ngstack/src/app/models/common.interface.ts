export interface IResponse {
    RESULT?: number;
    response?: any;
}

export interface IUser {
    _id?: string,
    name?: string,
    email?: string,
    user_name?: string
}

export interface ICurrentUser {
    _id?: string;
    name?: string;
    email?: string;
    user_name?: string;
}

export interface ICurrentRoute {
    post_id?: string,
    user_name?: string
}

export interface ILoginReq {
    email: string,
    password: string
}

export interface IResgisterReq {
    email: string,
    name: string,
    password: string
}

export interface IPost {
    _id?: string,
    user_id?: number,
    created?: Date,
    updated?: Date,
    title?: string,
    contents?: string,
    exposed?: boolean,
    priority?: number
}

export interface IPostReq {
    _id: string
}

export interface IPostRes {
    author: IUser,
    post: IPost
}

export interface IPostCreateReq {
    title: string,
    contents: string,
    exposed: boolean,
    priority: number
}

export interface IPostCreateRes {
    _id?: string,
    user_id?: number,
    created?: Date,
    updated?: Date,
    title?: string,
    contents?: string,
    exposed?: boolean,
    priority?: number
}

export interface IPostUpdateReq {
    _id: string,
    title: string,
    contents: string,
    exposed: boolean,
    priority: number
}

export interface IPostUpdateRes {
    message: string
}

export interface IPostDeleteReq {
    _id: string
}

export interface IPostDeleteRes {
    message: string
}