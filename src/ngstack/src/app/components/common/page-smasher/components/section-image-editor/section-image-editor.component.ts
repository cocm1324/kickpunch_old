import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BORDER_TYPE, WIDTH_TYPE, SECTION_CONTENT_TYPE } from '../../enums';
import { ISectionItem } from '../../models/section.interface';

export enum IMAGE_STEP {
	TYPE_SELECTION,
	IMAGE_UPLOAD,
	IMAGE_URL
}

@Component({
	selector: 'app-section-image-editor',
	templateUrl: './section-image-editor.component.html',
	styleUrls: ['./section-image-editor.component.scss']
})
export class SectionImageEditorComponent implements OnInit, OnDestroy {

	@Output() revert: EventEmitter<boolean> = new EventEmitter();
	@Output() submit: EventEmitter<ISectionItem> = new EventEmitter();

	step: IMAGE_STEP;
	imageStep = IMAGE_STEP;
	width: WIDTH_TYPE;
	widthType = WIDTH_TYPE;

	display: boolean = false;

	imageForm: FormGroup;
	borderType = BORDER_TYPE;

	private subscriptions: Subscription[] = [];

	get imageUrl() {
		return this.imageForm.get('imageUrl');
	}

	constructor(
		private fb: FormBuilder
	) { }

	ngOnInit() {
		this.imageForm = this.fb.group({
			imageUrl: [''],
			imageUpload: [''],
		});

		this.width = this.widthType.POST;
		this.step = this.imageStep.TYPE_SELECTION;

		const imageUrl$ = this.imageUrl.valueChanges.subscribe(next => {
			if (next) {
				this.display = false;
			}
		});
		this.subscriptions.push(imageUrl$);
	}

	uploadSelected() {
		this.step = this.imageStep.IMAGE_UPLOAD;
	}

	urlSelected() {
		this.step = this.imageStep.IMAGE_URL;
	}

	isExpandable() {
		return this.width != this.widthType.HERO;
	}

	isShrinkable() {
		return this.width != this.widthType.POST;
	}

	expand() {
		if (this.isExpandable()) {
			this.width == this.widthType.POST ? this.width = this.widthType.WIDE : this.width = this.widthType.HERO;
		}
	}

	shrink() {
		if (this.isShrinkable()) {
			this.width == this.widthType.HERO ? this.width = this.widthType.WIDE : this.width = this.widthType.POST;
		}
	}

	loadImageUrl() {
		if (this.imageUrl.value.length > 0) {
			this.display = true;
		}
	}

	clearImageUrl() {
		this.display = false;
		this.imageUrl.setValue('');
	}

	onRevert($event) {
		if (this.step == IMAGE_STEP.TYPE_SELECTION) {
			this.revert.emit(false);
		}
		else {
			if (this.display == true) {
				if (confirm('Changes will be lost')) {
					this.step = this.imageStep.TYPE_SELECTION;
					this.width = this.widthType.POST;
					this.clearImageUrl();
				}
			} else {
				this.step = this.imageStep.TYPE_SELECTION;
				this.width = this.widthType.POST;
				this.clearImageUrl();
			}
		}
	}

	getBorderType() {
		return this.display ? this.borderType.SUBMIT : this.borderType.NONE;
	}

	onSubmit($event) {
		if (this.step == this.imageStep.IMAGE_URL) {
			const section: ISectionItem = {
				seq: null,
				width: this.width,
				type: SECTION_CONTENT_TYPE.IMAGE_URL,
				contents: this.imageUrl.value
			}
			this.submit.emit(section);
			this.revert.emit(true);
		}
	}

	ngOnDestroy() {
		this.subscriptions.forEach(item => {
			item.unsubscribe();
		});
	}
}
