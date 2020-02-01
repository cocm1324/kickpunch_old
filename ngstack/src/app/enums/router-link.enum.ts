export enum RouterLinkType{
    LOGIN = 'login',
    REGISTER = 'register',

    USER = ':user',
    USER_MANAGER = ':user/manager',
    NEW_POST = ':user/new',
    POST = ':user/post/:post_id',
    MODIFTY_POST = ':user/post/:post_id/edit',

    NOTFOUND = 'notfound'
}