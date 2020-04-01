import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageSmasherComponent } from './page-smasher.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SectionBorderComponent } from './components/section-border/section-border.component';
import { SectionTypePickerComponent } from './components/section-type-picker/section-type-picker.component';
import { SectionImageEditorComponent } from './components/section-image-editor/section-image-editor.component';
import { SectionMarkdownEditorComponent } from './components/section-markdown-editor/section-markdown-editor.component';
import { NgxMdModule } from 'ngx-md';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
	declarations: [
		PageSmasherComponent,
		SectionBorderComponent,
		SectionTypePickerComponent,
		SectionMarkdownEditorComponent,
		SectionImageEditorComponent,
	],
	imports: [
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		CommonModule,
		NgxMdModule,
		DragDropModule,
	],
	exports: [
		PageSmasherComponent
	]
})
export class PageSmasherModule { }
