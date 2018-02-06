import {Directive, ElementRef} from '@angular/core';

@Directive({
    selector: '[numbersOnly]'
})
export class NumbersOnlyDirective {

    constructor(public el: ElementRef) {
        //console.log('numbers only');
        this.el.nativeElement.onkeypress = (evt:any) => {
            if (evt.which < 48 || evt.which > 57) {
                evt.preventDefault();
            }
        };

    }
}
