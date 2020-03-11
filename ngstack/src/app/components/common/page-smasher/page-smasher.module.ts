import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageSmasherComponent } from './page-smasher.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SectionBorderComponent } from './components/section-border/section-border.component';
import { SectionTypePickerComponent } from './components/section-type-picker/section-type-picker.component';

@NgModule({
	declarations: [
		PageSmasherComponent,
		SectionBorderComponent,
		SectionTypePickerComponent,
	],
	imports: [
		FormsModule,
		HttpClientModule,
		CommonModule
	],
	exports: [
		PageSmasherComponent
	]
})
export class PageSmasherModule { }
