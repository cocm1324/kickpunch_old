import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BORDER_TYPE } from '../../enums';

@Component({
	selector: 'app-section-border',
	templateUrl: './section-border.component.html',
	styleUrls: ['./section-border.component.scss']
})
export class SectionBorderComponent implements OnInit {

	@Input() type: BORDER_TYPE = BORDER_TYPE.NONE;
	@Output() clickEvent: EventEmitter<BORDER_TYPE> = new EventEmitter();

	private borderType = BORDER_TYPE;

	constructor() { }

	ngOnInit() {
	}

	isTypeNone() {
		return this.type == this.borderType.NONE;
	}

	isTypeOpen() {
		return this.type == this.borderType.OPEN;
	}

	isTypeClose() {
		return this.type == this.borderType.CLOSE;
	}

	isTypeSubmit() {
		return this.type == this.borderType.SUBMIT;
	}

	isTypeCancel() {
		return this.type == this.borderType.CANCEL;
	}

	isTypeUp() {
		return this.type == this.borderType.UP;
	}

	isTypeDown() {
		return this.type == this.borderType.DOWN;
	}

	bulletClick(type: BORDER_TYPE) {
		this.clickEvent.emit(type);
	}
}
