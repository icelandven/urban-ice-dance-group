import {SessionMisc} from './sessionMisc';
import {GlobalMisc} from './globalMisc';

export abstract class BreadCumpMisc {
  /** BREADCUMP ***** */

  static getBreadCump (): string {
    return SessionMisc.getSession('breadcump');
    // TODO REVISAR return sessionStorage.getItem('breadcump');
  }

  static setBreadCump(value: string, isDinamic?: boolean): void {
    if (!isDinamic) {
      value = GlobalMisc.getSysname() + value; // environment.nombreSistema
    }
    SessionMisc.setSession('breadcump', value);
  }

  static getPrinModFromBreadCump (value: string): string {
    const search = value.split(/\//);
    return search[1];
  }
  /** ***** BREADCUMP */
}
