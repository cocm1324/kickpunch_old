import {IResponse} from '.';

export interface IPostUpdateReq {
    id: string;
    title: string;
    contents: string;
    exposed: boolean;
    priority: number;
}

export interface IPostUpdateRes extends IResponse {
    response: string;
}