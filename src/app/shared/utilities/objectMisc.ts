export abstract class ObjectMisc {
  static areEquals(obj1, obj2): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
  static isEmpty(obj: any): boolean {
    // return (this.isObject(obj) && this.areEquals(obj, {}));
      return !obj || (Object.entries(obj).length === 0 && obj.constructor === Object);
  }
  static isEmptyCircular(obj: any): boolean {
    let isEmpty = true;
    Object.keys(obj).forEach(key => {
      isEmpty = false;
    });
    return isEmpty;
  }
    static isObject(obj: any): boolean {
        return (typeof obj === 'object');
    }
    static copyNestedObject(myObject: object): any {
        return  {...myObject}; // JSON.parse(JSON.stringify(myObject));
    }
    static copyObject(myObject: object): {} & object {
        return  this.copyNestedObject(myObject);
    }
    static objectToNum(obj: any): any {
        const newObj: any = {};
        Object.keys(obj).forEach(prop => {
            newObj[prop] = +obj[prop];
        });
    }
    static merge(obj1 = {}, obj2 = {}): object {
        return {...obj1, ...obj2};
    }

    static areEqualIndexObjects(obj1: any, obj2: any, indexs: string[]): boolean {
      let eq = true;
      indexs.forEach(i => {
          if (!obj1.hasOwnProperty(i) || !obj2.hasOwnProperty(i) || obj1[i] !== obj2[i]) {
              eq = false;
          }
      });
      return eq;
    }

    static hasObjectInside(obj1: any, obj2: any): boolean {
        let eq = true;
        Object.keys(obj2).forEach(prop => {
            if (!obj1.hasOwnProperty(prop) || obj1[prop] !== obj2[prop]) {
                eq = false;
                return;
            }
        });
        return eq;
    }

    static filterParams(obj: any, params: any, operadores?: string[]): boolean {
      let eq = true;
      Object.keys(params).forEach(prop => {
          /*if (!obj.hasOwnProperty(prop) || obj[prop] !== params[prop]) {
              eq = false;
          }*/
          if (!obj.hasOwnProperty(prop)) {
              eq = false;
          } else {
                if (!operadores) {
                    if (obj[prop] !== params[prop]) {
                        eq = false;
                    }
                } else {
                    const oper = operadores[prop];
                    switch (oper) {
                        case '=':
                            if (!(obj[prop] === params[prop])) {
                                eq = false;
                            }
                            break;
                        case '<>':
                            if (!(obj[prop] !== params[prop])) {
                                eq = false;
                            }
                            break;
                        case '>':
                            if (!(obj[prop] > params[prop])) {
                                eq = false;
                            }
                            break;
                        case '<':
                            if (!(obj[prop] < params[prop])) {
                                eq = false;
                            }
                            break;
                        case '>=':
                            if (!(obj[prop] >= params[prop])) {
                                eq = false;
                            }
                            break;
                        case '<=':
                            if (!(obj[prop] <= params[prop])) {
                                eq = false;
                            }
                            break;
                        default:
                        break;
                    }
                }
          }
      });
      return eq;
    }

    static findFirstKey(obj: any, keys: string[]): any {
      let result: any = false;
      const objkeys = Object.keys(obj);
      keys.forEach(k => {
          if (objkeys.includes(k)) {
              result = k;
              return;
          }
      });
      return result;
    }

    static JSONStringify(object) {
        let cache = [];
        const str = JSON.stringify(object,
            // custom replacer fxn - gets around "TypeError: Converting circular structure to JSON"
            (key, value) => {
                if (typeof value === 'object' && value !== null) {
                    if (cache.indexOf(value) !== -1) {
                        // Circular reference found, discard key
                        return;
                    }
                    // Store value in our collection
                    cache.push(value);
                }
                return value;
            }, 4);
        cache = null; // enable garbage collection
        return str;
    }
}
