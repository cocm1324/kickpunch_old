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

export interface IBlog {
    id: string;
    userName: string;
    email: string;
    title: string;
    description: string;
}