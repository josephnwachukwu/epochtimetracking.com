import { Directive, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[ngModel][hoursMask]',
  host: {
    '(input)' : 'onInputChange()'
      }
})
export class HoursMaskDirective {

  constructor(private model:NgModel) {
    //console.log('hours mask')
  }

  @HostListener('blur', ['$event'])
  onKeyDown(e:any) {
  	console.log('e', e.target.value);
    if(parseInt(e.target.value) > 24 || parseInt(e.target.value) < 0) {
      e.target.value = 0;
    }

  }

  onInputChange(): any {
    if(this.model && this.model.valueAccessor) {
      let newValue:number = this.model.value.toUpperCase();
      if(newValue) {
        this.model.valueAccessor.writeValue(newValue);
        this.model.viewToModelUpdate(newValue);
      }
    }
  }
}

