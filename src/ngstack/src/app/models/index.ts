export {
    IResponse,
    IBlog,

    IUser,
    
    ICurrentRoute,

    IPost, 
    IPostReq, IPostRes,
    IPostCreateReq, IPostCreateRes,
    IPostUpdateReq, IPostUpdateRes,
    IPostDeleteReq, IPostDeleteRes
} from './common.interface';

export {
    ILoginReq, ILoginRes,
    IRegisterReq, IRegisterRes,
    ISessionVerifyReq
} from './session.interface';

export {
    IGetBlog, IGetBlogPost
} from './blog.interface';

export {
    IGetManagerPost
} from './manager.interface';
