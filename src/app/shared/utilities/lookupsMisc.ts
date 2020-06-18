import ArrayStore from 'devextreme/data/array_store';
import {ArrayMisc} from '@MasUtilities/arrayMisc';

export abstract class LookupsMisc {

  static displayExpFromArray(data, display) {
    if (!data) {
      return null;
    }
    if (ArrayMisc.isArray(display)) {
      return  display.reduce((b, a, i) => {
        return `${b}${i > 0 ? ' ' : ''}${data[a]}`;
      }, '');
    } else {
      return  data[display];
    }
  }

  static lookupDisplayExpresion(data: any, value: string, display: any) {
    return data ? `${data[value]} - ${this.displayExpFromArray(data, display)}` : null;
  }

  static setLookupDataSource(dataSource: any, valueExp: string, displayExp: any, dispayExpFunc = false,  value = null) {
    return {
      dataSource,
      displayExpr: dispayExpFunc ? data => this.lookupDisplayExpresion(data, valueExp, displayExp)
        : data => this.displayExpFromArray(data, displayExp),
      valueExpr: valueExp,
      allowClearing: true,
      value,
    };
  }

  static setLookupArrStore(arrStore: any, valueExp: string, displayExp: any, dispayExpFunc = false,  value = null) {
    return {...{
        dataSource: new ArrayStore({
          data: arrStore,
          key: valueExp,
        }),
        displayExpr: dispayExpFunc ? data => this.lookupDisplayExpresion(data, valueExp, displayExp)
          : data => this.displayExpFromArray(data, displayExp),
        valueExpr: valueExp,
        allowClearing: true,
      }, ...value !== null ? { value} : {}};
  }

  static setArrayLookup(arr, id, value) {
    return {
      dataSource: new ArrayStore({
        data: arr,
        key: id
      }),
      displayExpr: data => this.lookupDisplayExpresion(data, id, value),
      valueExpr: id,
      allowClearing: true,
    };
  }
}

