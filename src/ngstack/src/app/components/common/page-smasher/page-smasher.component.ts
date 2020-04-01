import { Component, OnInit, ElementRef, ViewChild, OnDestroy, Renderer2 } from '@angular/core';
import { BORDER_TYPE, SECTION_TYPE, WIDTH_TYPE, SECTION_CONTENT_TYPE } from './enums';
import { ISectionItem } from './models/section.interface';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

const mockup = [
	{
	  seq: null,
	  width: 0,
	  type: 2,
	  contents: "# Lorem Ipsum"
	},
	{
	  seq: null,
	  width: 1,
	  type: 0,
	  contents: "https://miro.medium.com/max/2000/1*xK8B_iiUSK_eU3jyG79djA.jpeg"
	},
	{
	  seq: null,
	  width: 0,
	  type: 2,
	  contents: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{
	  seq: null,
	  width: 0,
	  type: 2,
	  contents: "Morbi leo urna molestie at elementum eu facilisis sed odio. Risus at ultrices mi tempus imperdiet. Quisque sagittis purus sit amet volutpat consequat mauris nunc congue. Interdum posuere lorem ipsum dolor sit amet. Cras fermentum odio eu feugiat pretium nibh. Sed felis eget velit aliquet sagittis id consectetur purus ut. Nisl pretium fusce id velit ut tortor pretium viverra. Morbi leo urna molestie at elementum eu facilisis. Nisl condimentum id venenatis a. Blandit turpis cursus in hac. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. Quis vel eros donec ac odio tempor orci dapibus ultrices. Fermentum leo vel orci porta non. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam."
	}
]

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
export class PageSmasherComponent implements OnInit, OnDestroy {

	@ViewChild('editorFooter') editorFooter: ElementRef

	sectionDragged: boolean = false;
	pickerOpen: boolean = false;

	borderType = BORDER_TYPE;
	editorStep: SECTION_CREATION_STEP;
	widthType = WIDTH_TYPE;
	sectionContentType = SECTION_CONTENT_TYPE;
	sectionCreationStep = SECTION_CREATION_STEP;
	
	sections: Array<ISectionItem> = mockup;

	get lastElementOpen() {
		return this.pickerOpen;
	}

	constructor(
		private renderer: Renderer2
	) { }

	ngOnInit() {
		this.pickerOpen = false;
		this.editorStep = this.sectionCreationStep.TYPE_PICKER;

		// this.lastElement = {open: true};
		// this.editorStep = this.sectionCreationStep.IMAGE_EDITOR;

		console.log(this.renderer)

		window.addEventListener('scroll', this.scroll, true);
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

	edit($event, section) {

	}

	sectionDrop(event: CdkDragDrop<ISectionItem[]>) {
		moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
		this.sectionDragged = false;
	}

	dragStart($event) {
		this.sectionDragged = true;
	}

	drop($event) {
		console.log($event)
	}

	dragEnter($event) {
		console.log($event)
	}

	enter($event) {
		console.log($event)
	}

	scroll() {
		const current = document.documentElement.scrollTop;
		const breakPoint = document.documentElement.scrollHeight - document.documentElement.clientHeight - 50;

		console.log(current, breakPoint, this.renderer);

		if (current > breakPoint) {
			this.renderer.setStyle(this.editorFooter.nativeElement, 'bottom', '0');
			this.renderer.setStyle(this.editorFooter.nativeElement, 'position', 'absolute');
		}
	}

	cancel() {

	}

	save() {

	}

	ngOnDestroy() {
		window.removeEventListener('scroll', this.scroll, true);
	}
}
