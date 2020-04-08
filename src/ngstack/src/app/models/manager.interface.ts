import {IResponse, IPost} from '.';

export interface IGetManagerPost extends IResponse {
    response?: IPost[];
}
