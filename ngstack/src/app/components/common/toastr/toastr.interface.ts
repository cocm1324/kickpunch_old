import { ToastrAlertType } from '../../../enums/toastr.enum'

export interface Toastr {
    header: string;
    body?: string;
    alert: ToastrAlertType;
    timestamp: Date;
}