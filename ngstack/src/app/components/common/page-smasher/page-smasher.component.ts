import { Component, OnInit } from '@angular/core';
import { BORDER_TYPE, SECTION_TYPE, WIDTH_TYPE, SECTION_CONTENT_TYPE } from './enums';
import { ISectionItem } from './models/section.model';

export interface ICommonLastElement {
	open: boolean;
}

export enum SECTION_CREATION_STEP {
	TYPE_PICKER,
	MARKDOWN_EDITOR,
	IMAGE_EDITOR
}

@Component({
	selector: 'app-page-smasher',
	templateUrl: './page-smasher.component.html',
	styleUrls: ['./page-smasher.component.scss']
})
export class PageSmasherComponent implements OnInit {

	private borderType = BORDER_TYPE;
	private sectionCreationStep = SECTION_CREATION_STEP;
	private lastElement: ICommonLastElement;
	private editorStep: SECTION_CREATION_STEP;

	private widthType = WIDTH_TYPE;
	private sectionContentType = SECTION_CONTENT_TYPE;

	private sections: Array<ISectionItem> = [];

	constructor( ) { }

	get lastElementOpen() {
		return this.lastElement.open;
	}

	ngOnInit() {
		this.lastElement = {open: false};
		this.editorStep = this.sectionCreationStep.TYPE_PICKER;

		// this.lastElement = {open: true};
		// this.editorStep = this.sectionCreationStep.IMAGE_EDITOR;
	}
	
	toggleLastElement($event) {
		this.lastElement.open = !this.lastElement.open;
	}

	loadEditor($event) {
		if ($event == SECTION_TYPE.IMAGE) {
			this.editorStep = this.sectionCreationStep.IMAGE_EDITOR;
		} else if ($event == SECTION_TYPE.POST) {
			this.editorStep = this.sectionCreationStep.MARKDOWN_EDITOR;
		}
	}

	goToTypePicker($event) {
		this.editorStep = this.sectionCreationStep.TYPE_PICKER;
	}

	submit($event) {
		this.sections.push($event);
	}
}
