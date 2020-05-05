import {IResponse, IUser, IPost} from '.'

export interface IPostReq {
    id: string
}

export interface IPostRes extends IResponse {
    response: {
        user: IUser,
        post: IPost
    }
}