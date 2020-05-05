import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'mdTextSummary'})
export class MdTextSummaryPipe implements PipeTransform {
	transform(mdText: string, length?: number): string {
		return mdText.replace(/[|&;$%@"<>()+,_]/g, "").substr(0, length ? length : 200) + "...";
	}
}
