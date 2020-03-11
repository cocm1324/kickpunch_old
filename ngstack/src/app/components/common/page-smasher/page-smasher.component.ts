import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { BORDER_TYPE } from './enums';

export interface ICommonLastElement {
	open: boolean;
}

export interface ISection {
	rowNumber: number;
	type: SectionType;
	contents: string;
}

export enum SectionType {
	HERO,
	MARKDOWN,
	IMAGE
}

@Component({
	selector: 'app-page-smasher',
	templateUrl: './page-smasher.component.html',
	styleUrls: ['./page-smasher.component.scss']
})
export class PageSmasherComponent implements OnInit {

	private borderType = BORDER_TYPE;
	private lastElement: ICommonLastElement;
	private sections:string;

	constructor( ) { }

	get lastElementOpen() {
		return this.lastElement.open;
	}

	ngOnInit() {
		this.lastElement = {open: false}
	}


	
	toggleLastElement($event) {
		this.lastElement.open = !this.lastElement.open;
	}
	lastElementBullet() {
		return this.lastElement.open ? this.borderType.CANCEL : this.borderType.ADD;
	}

}
