import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BORDER_TYPE } from '../../enums';

export enum SECTION_TYPE {
	IMAGE,
	POST
}

@Component({
	selector: 'app-section-type-picker',
	templateUrl: './section-type-picker.component.html',
	styleUrls: ['./section-type-picker.component.scss']
})
export class SectionTypePickerComponent implements OnInit {

	@Output() clickEvent: EventEmitter<SECTION_TYPE> = new EventEmitter();
	@Input() sectionOpen: boolean = false;

	sectionType = SECTION_TYPE;
	borderType = BORDER_TYPE;

	constructor() { }

	ngOnInit() {
		
	}

	imageSelected() {
		this.clickEvent.emit(this.sectionType.IMAGE);
	}

	postSelected() {
		this.clickEvent.emit(this.sectionType.POST);
	}

	getBorderType() {
		return this.sectionOpen ? this.borderType.CLOSE : this.borderType.OPEN;
	}

	toggleSection($event) {
		this.sectionOpen = !this.sectionOpen;
	}
}
