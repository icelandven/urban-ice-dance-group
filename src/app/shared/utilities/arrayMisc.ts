import {ObjectMisc} from './objectMisc';

export abstract class ArrayMisc {
  /** ARRAYS ***** */
  static inArray(array: any[], find: any): boolean {
    return (array.indexOf(find) > -1);
  }


  static notInArray(array: any[], find: any): boolean {
    return (array.indexOf(find) === -1);
  }

  static objectInArray(arr: any[], obj: any): boolean {
    let esta = false;
    for (const oo of arr) {
      if (ObjectMisc.areEquals(oo, obj)) {
        esta = true;
        break;
      }
    }
    return esta;
  }

  static objectNotInArray(arr: any[], obj: any): boolean {
    return !this.objectInArray(arr, obj);
  }

  static cloneArray(arr: any[]): any[] {
    return [...arr];
  }

  static removeFromArray(arr: any[], ind: number): any[] {
    arr.splice(ind, 1);
    return arr;
  }

  static arrayMerge(arr1: any[], arr2: any[]): any[] {
    return [...arr1, ...arr2];
  }

  static isArray(data: any): boolean {
    return (data instanceof Array);
  }
  /** ***** ARRAYS */

  static arrayInsert(data: any[], index: number, item: any): any[] {
    data.splice( index, 0, item );
    return data;
  }

  static arraySortObject(a: any, b: any, prop: string): number {
    if (a[prop] < b[prop]) {
      return -1;
    } else if (a[prop] > b[prop]) {
      return 1;
    } else {
      return 0;
    }
  }

  static sortAsc(arr: any[], prop: string): any[] {
    return arr.sort((a, b) => this.arraySortObject(a, b, prop));
  }

  static sortDesc(arr: any[], prop: string): any[] {
    return arr.sort((a, b) => (this.arraySortObject(a, b, prop)) * -1);
  }
}
