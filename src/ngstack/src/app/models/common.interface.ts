export interface IResponse {
    RESULT?: number;
}

export interface IUser {
    id?: string;
    email?: string;
    userName?: string;
    created?: Date;
}

export interface ICurrentRoute {
    postId?: string,
    userName?: string
}

export interface IPost {
    id?: string,
    userId?: number,
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

export interface IBlog {
    id: string;
    userName: string;
    email: string;
    title: string;
    description: string;
}