import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MdTextSummaryPipe} from './md-text-summary.pipe';

@NgModule({
    declarations: [
        MdTextSummaryPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        MdTextSummaryPipe
    ]
})
export class PipeModule { }
