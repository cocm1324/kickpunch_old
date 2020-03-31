import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ISectionItem } from '../../models/section.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { WIDTH_TYPE, BORDER_TYPE, SECTION_CONTENT_TYPE } from '../../enums';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-section-markdown-editor',
	templateUrl: './section-markdown-editor.component.html',
	styleUrls: ['./section-markdown-editor.component.scss']
})
export class SectionMarkdownEditorComponent implements OnInit, OnDestroy {

  	@Output() revert: EventEmitter<boolean> = new EventEmitter();
	@Output() submit: EventEmitter<ISectionItem> = new EventEmitter();

	display: boolean = false;
	width: WIDTH_TYPE;
	widthType = WIDTH_TYPE;
	borderType = BORDER_TYPE;

	private postForm: FormGroup;
	private subscriptions: Subscription[] = [];

	get post() {
		return this.postForm.get('post');
	}

	constructor(
		private fb: FormBuilder
	) { }

	ngOnInit() {
		this.postForm = this.fb.group({
			post: ['']
		});

		this.width = this.widthType.POST;

		const post$ = this.post.valueChanges.subscribe(next => {
			if (next == '') {
				this.display = false;
			} else {
				this.display = true;
			}
		});
		this.subscriptions.push(post$);
	}

	isExpandable() {
		return this.width != this.widthType.WIDE;
	}

	isShrinkable() {
		return this.width != this.widthType.POST;
	}

	expand() {
		if (this.isExpandable()) {
			this.width == this.widthType.POST ? this.width = this.widthType.WIDE : null;
		}
	}

	shrink() {
		if (this.isShrinkable()) {
			this.width == this.widthType.WIDE ? this.width = this.widthType.POST: null;
		}
	}

	loadImageUrl() {
		if (this.post.value.length > 0) {
			this.display = true;
		}
	}

	clearImageUrl() {
		this.display = false;
		this.post.setValue('');
	}

	onRevert() {
		if (this.display == true) {
			if (confirm('Changes will be lost')) {
				this.revert.emit(false);
			}
		} else {
			this.revert.emit(false);
		}
	}

	getBorderType() {
		return this.display ? this.borderType.SUBMIT : this.borderType.NONE;
	}

	onSubmit() {
		const section: ISectionItem = {
			seq: null,
			width: this.width,
			type: SECTION_CONTENT_TYPE.POST,
			contents: this.post.value
		}
		this.submit.emit(section);
		this.revert.emit(true);
	}

	ngOnDestroy() {
		this.subscriptions.forEach(item => {
			item.unsubscribe();
		});
	}
}
