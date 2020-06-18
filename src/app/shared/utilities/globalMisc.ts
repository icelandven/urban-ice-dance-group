import {SessionMisc} from './sessionMisc';
import {StringMisc} from './stringMisc';
import {ObjectMisc} from './objectMisc';
import notify from 'devextreme/ui/notify';
import {confirm, alert} from 'devextreme/ui/dialog';
import {SystemConfig} from '@MasConfig/systemConfig';
import {WidthHeightMed} from '@MasInterfaces/width-height-med';

export abstract class GlobalMisc {
  static isEmptyData(data: any): boolean {
    return (data === '' || data === 0 || data  === null);
  }
  /** SYSNAME ***** */
  static setSysname(name: string): void {
    SessionMisc.setSession('sysname', name);
  }

  static getSysname(): string {
    return SessionMisc.getSession('sysname');
  }
  /** ***** SYSNAME */

  /** SHORTSYSNAME ***** */
  static setShortSysname(name: string): void {
    SessionMisc.setSession('shortSysname', name);
  }

  static getShortSysname(): string {
    return SessionMisc.getSession('shortSysname');
  }
  /** ***** SHORTSYSNAME */

    /** SUCCESSS ***** */
    static successNotify(men: string, data?: any) {
        notify(`${men}${data ? + ' '
          + JSON.stringify(data) : ''} `, 'success', SystemConfig.timeshow);
    }

  static infoNotify(men: string) {
    notify(men, 'info', SystemConfig.timeshow);
  }

    static setNotify(men: string) {
      notify(men, 'success', SystemConfig.timeshow);
    }
    /** ***** SUCCESS */

  /** CATCH ERROR ***** */
  static setWarning(men: string, error = false) {
    notify(men, error ? 'error' : 'warning', SystemConfig.timeshow);
    if (error) {
      throw new Error(men);
    }
  }

  static notifyError(men: string, error: string, type: string = 'warning') {
      notify(`${men} :${this.errorCath(error)}`, type, SystemConfig.timeshow);
      if (type === 'error') {
          throw new Error(men);
      }
  }

    static cathNotifyExtraMen(error, men: string, extraMen: string, type = 'warning'): void {
        this.notifyError(`${men} ${extraMen}`, error, type);
    }

    static showAlert(men: string, title = ''): void {
      alert(men, title);
    }

    static async showPromt(men: string, buttonText: string): Promise<boolean> {
      return confirm(men, buttonText);
    }

  static errorCath(error: any): string {
    let errorMen = '';
    if (StringMisc.isString(error)) {
      errorMen = error;
    } else  if (ObjectMisc.isObject(error)) {
      if (error.error) {
        if (StringMisc.isString(error.error)) {
          errorMen = error.error;
        } else if (ObjectMisc.isObject(error.error) && error.error.ResponseStatus) {
          if (error.error.ResponseStatus.Message) {
            errorMen = error.error.ResponseStatus.Message;
          } else if (error.error.ResponseStatus.ErrorCode) {
            errorMen = error.error.ResponseStatus.ErrorCode;
          }
        } else if (StringMisc.isString(error.message)) {
          errorMen = error.message;
        }
      } else {
        if (error.message) {
          errorMen = error.message;
        } else if (error.statusText) {
          errorMen = error.statusText;
        }
      }
    }
    return errorMen;
  }

  /** ***** CATCH ERROR */

  /** WINDOWS REF ***** */
  static getNativeWindow(): Window {
    return window;
  }

  static openWindow(url: string, config?: any): Window | null {
    // const tar = config.target || '_blank';
    return window.open(url, '', 'location=no,width=1800,height=900,scrollbars=yes,top=100,left=700,resizable = no');
  }

  /** ***** WINDOWS REF */

  /** WIDTH HEIGHT CALCULATOR ***** */

  static setWithHeight(whm?: WidthHeightMed): any {
    if (whm && whm.fullScreen) {
        return {
            fullscreen: 1,
        };
    }
    let mm = 1.5;
    if (whm && whm.Media) {
      mm = whm.Media;
    }
    const val = {
      width: window.innerWidth / mm,
      height: window.innerHeight / mm
    };
    if (whm && whm.hasOwnProperty('width')) {
      val.width = whm.width;
    }
    if (whm && whm.hasOwnProperty('height')) {
      val.height = whm.height;
    }
    return val;
  }

  /** ***** WIDTH HEIGHT CALCULATOR */

  /**
   * Function
   */
  static isFunction(f: any): boolean {
    return (f && f instanceof Function);
  }

  static cathNotify(error: any, errorConsultaFormaRQ: string) {

  }

  static isModActive(mod: string) {
    return SystemConfig.activeMods.includes(mod);
  }

  static ActiveMods(): string[] {
    return SystemConfig.activeMods;
  }
}
