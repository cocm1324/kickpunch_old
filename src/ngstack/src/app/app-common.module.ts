import {NgModule} from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatMenuModule} from '@angular/material/menu';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

@NgModule({
	imports: [
		BrowserAnimationsModule,
		DragDropModule,
		MatMenuModule
	],
	exports: [
		BrowserAnimationsModule,
		DragDropModule,
		MatMenuModule
	]
})
export class AppCommonModule { }
