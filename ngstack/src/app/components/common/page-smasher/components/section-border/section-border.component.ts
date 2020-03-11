import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BORDER_TYPE } from '../../enums';

@Component({
	selector: 'app-section-border',
	templateUrl: './section-border.component.html',
	styleUrls: ['./section-border.component.scss']
})
export class SectionBorderComponent implements OnInit {

	@Input() type: BORDER_TYPE = BORDER_TYPE.NONE;
	@Output() clickEvent: EventEmitter<boolean> = new EventEmitter();

	constructor() { }

	ngOnInit() {
	}

	isTypeNone() {
		return this.type == BORDER_TYPE.NONE;
	}

	isTypeAdd() {
		return this.type == BORDER_TYPE.ADD;
	}

	isTypeCancel() {
		return this.type == BORDER_TYPE.CANCEL;
	}

	isTypeUp() {
		return this.type == BORDER_TYPE.UP;
	}

	isTypeDown() {
		return this.type == BORDER_TYPE.DOWN;
	}

	bulletClick() {
		this.clickEvent.emit(true);
	}
}
