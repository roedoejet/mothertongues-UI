import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the NoNullValuesPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'noNullValues',
})
export class NoNullValuesPipe implements PipeTransform {
  /**
   * Removes empty strings from array
   */
  transform(value: Array<string>, ...args) {
    if (value){
      return value.filter(x => x !== null && x !== '')
    }
  }
}

@Pipe({
  name: 'noNullObjectValues',
})
export class NoNullObjectValuesPipe implements PipeTransform {
  /**
   * Removes empty objects from array
   */
  transform(value: Array<object>, ...args) {
    if (value){
      return value.filter(x => {
        let not_empty = true;
        Object.keys(x).forEach(k => {
          if (!x[k]) {
            not_empty = false; return not_empty
          }
        })
        return not_empty
      })
    }
  }
}
