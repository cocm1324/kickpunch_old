import {NgModule} from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
	imports: [
		DragDropModule
	],
	exports: [
		DragDropModule
	]
})
export class AppCommonModule { }
