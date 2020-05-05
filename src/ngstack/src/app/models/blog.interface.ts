import { IResponse, IBlog, IPost } from '.';

export interface IGetBlog extends IResponse {
    response?: IBlog;
}

export interface IGetBlogPost extends IResponse {
    response?: IPost[];
}