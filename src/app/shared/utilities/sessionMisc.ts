import {ObjectMisc} from './objectMisc';
import {EncryptMisc} from './encryptMisc';

export abstract class SessionMisc {
    private static codeKey(key: string) {
        return btoa(key.toUpperCase());
    }
  static setSession(key: string, value: any): void {
    if (EncryptMisc.hasEncryption()) {
        sessionStorage.setItem(this.codeKey(key), EncryptMisc.encrypt(value));
    } else {
        let val: any;
        if (ObjectMisc.isObject(value)) {
            val = JSON.stringify(value);
        } else {
            val = value;
        }
        sessionStorage.setItem(key, val);
    }
  }
  static deleteSession(key: string): void {
      if (EncryptMisc.hasEncryption()) {
          sessionStorage.removeItem(this.codeKey(key));
      } else {
          sessionStorage.removeItem(key);
      }
  }
  static getSession(key: string): any {
      if (EncryptMisc.hasEncryption()) {
          return EncryptMisc.decrypt(sessionStorage.getItem(this.codeKey(key)));
      } else {
          let val = sessionStorage.getItem(key);
          try {
              val = JSON.parse(val);
          } catch (e) {}
          return val;
      }
  }
}

