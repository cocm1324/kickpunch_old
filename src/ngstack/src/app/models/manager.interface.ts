import {IResponse, IPost} from '.';

export interface IGetManagerPost extends IResponse {
    response?: IPost[];
}

export interface IPostDeleteReq {
    id: string;
}

export interface IPostDeleteRes extends IResponse {
    response: string;
}

export interface IBlogUpdateReq {
    userId: string;
    title: string;
    description: string;
}

export interface IBlogUpdateRes extends IResponse {
    response: string;
}
