export enum RouterLinkType{
    LOGIN =         'login',
    REGISTER =      'register',
    TEST_PAGE =     'testpage',

    USER =          ':user_name',
    USER_MANAGER =  ':user_name/manager',
    NEW_POST =      ':user_name/new',
    POST =          ':user_name/post/:post_id',
    MODIFTY_POST =  ':user_name/post/:post_id/edit',

    NOTFOUND =      'notfound'
}