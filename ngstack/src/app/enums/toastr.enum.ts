import { Toastr } from '../components/common/toastr/toastr.interface'

export enum ToastrAlertType {
    DANGER =    'alert-danger',
    SUCCESS =   'alert-success',
    WARNING =   'alert-warning',
    INFO =      'alert-info', 
    PRIMARY =   'alert-primary', 
    SECONDARY = 'alert-secondary', 
    LIGHT =     'alert-light'
}

export const ToastrType: {[key: string]: Toastr}  = {
    DEFAULT: {
        header:     '',
        body:       "",
        alert:      ToastrAlertType.LIGHT,
        timestamp:  null
    },
    INVALID_REQUEST: {
        header:     'Invalid Request',
        body:       "",
        alert:      ToastrAlertType.DANGER,
        timestamp:  null
    },

    REGISTER_SUCCESS: {
        header:     'Welcome to KickPunch!',
        body:       "Do post, and get a better tommorrow",
        alert:      ToastrAlertType.SUCCESS,
        timestamp:  null
    },
    REGISTER_FAIL_INTERNAL_SERVER: {
        header:     `Ooopse, please try again later`,
        body:       "Something went wrong back there",
        alert:      ToastrAlertType.DANGER,
        timestamp:  null
    },
    REGISTER_FAIL_ALREADY_EXIST: {
        header:     `User name already exists`,
        body:       "Please try another email",
        alert:      ToastrAlertType.DANGER,
        timestamp:  null
    },
    LOGIN_SUCCESS: {
        header:     `Hello`,
        body:       "Welcome back ^^7",
        alert:      ToastrAlertType.SUCCESS,
        timestamp:  null
    },
    LOGIN_FAIL_INTERNAL_SERVER: {
        header:     "Internal Server Error",
        body:       "Something went wrong back there",
        alert:      ToastrAlertType.DANGER,
        timestamp:  null
    },
    LOGIN_FAIL_IDPW_WRONG: {
        header:     "Wrong Email or Password",
        body:       "Please Check if your email or password",
        alert:      ToastrAlertType.DANGER,
        timestamp:  null
    },
    LOGOUT: {
        header:     `Goodbye`,
        body:       "You are now signed out. Do come again ^^7",
        alert:      ToastrAlertType.WARNING,
        timestamp:  null
    },



    UPDATE_POST_SUCCESS: {
        header:     'Post updated successfully',
        body:       "Do post more, would ya?",
        alert:      ToastrAlertType.SUCCESS,
        timestamp:  null
    },
    UPDATE_POST_FAIL: {
        header:     `Ooopse, please try again later`,
        body:       "Something went wrong back there",
        alert:      ToastrAlertType.DANGER,
        timestamp:  null
    },
    CREATE_POST_SUCCESS: {
        header:     'Post created successfully',
        body:       "Do post more, would ya?",
        alert:      ToastrAlertType.SUCCESS,
        timestamp:  null
    },
    CREATE_POST_FAIL: {
        header:     `Ooopse, please try again later`,
        body:       "Something went wrong back there",
        alert:      ToastrAlertType.DANGER,
        timestamp:  null
    }
}