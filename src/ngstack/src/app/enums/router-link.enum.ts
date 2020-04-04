export enum RouterLinkType{
    LOGIN =         'login',
    REGISTER =      'register',
    TEST_PAGE =     'testpage',

    USER =          ':userName',
    USER_MANAGER =  ':userName/manager',
    NEW_POST =      ':userName/new',
    POST =          ':userName/post/:postId',
    MODIFTY_POST =  ':userName/post/:postId/edit',

    NOTFOUND =      'notfound'
}