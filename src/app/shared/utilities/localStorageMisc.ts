import {ObjectMisc} from './objectMisc';
import {EncryptMisc} from './encryptMisc';

export abstract class LocalStorageMisc {
    private static codeKey(key: string) {
        return btoa(key.toUpperCase());
    }
    static setStorage(key: string, value: any): void {
        if (EncryptMisc.hasEncryption()) {
            localStorage.setItem(this.codeKey(key), EncryptMisc.encrypt(value));
        } else {
            let val: any;
            if (ObjectMisc.isObject(value)) {
                val = JSON.stringify(value);
            } else {
                val = value;
            }
            localStorage.setItem(key, val);
        }
    }

    static deleteStorage(key: string): void {
        if (EncryptMisc.hasEncryption()) {
            localStorage.removeItem(this.codeKey(key));
        } else {
            localStorage.removeItem(key);
        }
    }

    static getstorage(key: string): any {
        if (EncryptMisc.hasEncryption()) {
            return EncryptMisc.decrypt(localStorage.getItem(this.codeKey(key)));
        } else {
            let val = localStorage.getItem(key);
            try {
                val = JSON.parse(val);
            } catch (e) {}
            return val;
        }
    }
}
