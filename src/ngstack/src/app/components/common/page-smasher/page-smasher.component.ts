import { Component, OnInit } from '@angular/core';
import { BORDER_TYPE, SECTION_TYPE, WIDTH_TYPE, SECTION_CONTENT_TYPE } from './enums';
import { ISectionItem } from './models/section.model';


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

	borderType = BORDER_TYPE;
	editorStep: SECTION_CREATION_STEP;
	widthType = WIDTH_TYPE;
	sectionContentType = SECTION_CONTENT_TYPE;
	sectionCreationStep = SECTION_CREATION_STEP;
	
	sections: Array<ISectionItem> = [];

	private pickerOpen: boolean;

	constructor( ) { }

	get lastElementOpen() {
		return this.pickerOpen;
	}

	ngOnInit() {
		this.pickerOpen = false;
		this.editorStep = this.sectionCreationStep.TYPE_PICKER;

		// this.lastElement = {open: true};
		// this.editorStep = this.sectionCreationStep.IMAGE_EDITOR;
	}
	
	toggleLastElement($event) {
		this.pickerOpen = !this.pickerOpen;
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
		if (!$event) {
			this.pickerOpen = true;
		}
	}

	submit($event) {
		this.sections.push($event);
	}
}
