export interface ICurrentUser {
    _id?: string;
    name?: string;
    email?: string;
    user_name?: string;
}

export interface ICurrentRoute {
    postId?: string,
    userName?: string
}

export interface ILoginReq {
    email: string,
    password: string
}

export interface IResgisterUserReq {
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

export interface IPostUpdateReq {
    _id: string,
    title: string,
    contents: string,
    exposed: boolean,
    priority: number
}