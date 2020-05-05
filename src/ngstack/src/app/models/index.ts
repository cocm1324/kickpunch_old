export {
    IResponse,
    IBlog,

    IUser,
    
    ICurrentRoute,

    IPost, 
    IPostCreateReq, IPostCreateRes
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
    IGetManagerPost,
    IPostDeleteReq, IPostDeleteRes,
    IBlogUpdateReq, IBlogUpdateRes
} from './manager.interface';

export {
    IPostReq, IPostRes
} from './post.interface';

export {
    IPostUpdateReq, IPostUpdateRes,
} from  './editor.interace';
