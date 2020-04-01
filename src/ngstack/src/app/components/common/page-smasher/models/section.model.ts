import { SECTION_CONTENT_TYPE, WIDTH_TYPE } from '../enums';

export interface ISectionItem {
    seq: number;
    width: WIDTH_TYPE;
    type: SECTION_CONTENT_TYPE;
    contents: string;
}